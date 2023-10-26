const { dataSource } = require('./dataSource');
const _ = require('lodash');
const { useTransaction } = require('../utils');
const uuid4 = require('uuid4');

const isEventExistDao = async (eventId) => {
  const [eventExist] = await dataSource.query(
    `
    SELECT id FROM events WHERE id = ?
    `,
    [eventId],
  );
  return eventExist;
};

const getOrderIdByOrderNumberQuery = `SELECT id FROM orders WHERE order_no = ?`;

const getSeatsDataDao = async (eventId) => {
  const seats = await dataSource.query(
    `
      SELECT
      s.id,
      CONCAT(s.row_name, '-', s.col_name) AS name,
      s.row_name AS 'row',
      s.col_name AS 'col',
      sg.grade AS grade,
      es.status AS status
      FROM seats s
      LEFT JOIN seat_grades sg ON s.grade_id = sg.id
      LEFT JOIN event_seats es ON s.id = es.seat_id
      LEFT JOIN stages ON s.stage_id = stages.id
      LEFT JOIN events ON stages.id = events.stage_id
      WHERE 
        events.id = ?
      `,
    [eventId],
  );
  const detail = await dataSource.query(
    `
      SELECT
        seat_grades.grade,        
        seat_grades.price
      FROM 
        seat_grades   
      LEFT JOIN stages ON seat_grades.stage_id = stages.id
      LEFT JOIN events ON stages.id = events.stage_id
      WHERE 
        events.id = ?        
      `,
    [eventId],
  );
  return {
    seats,
    detail,
  };
};

const isSeatReservableDao = async (data) => {
  const { seats } = data;
  const result = await dataSource.query(
    `
    SELECT status FROM event_seats WHERE seat_id IN (?)
  `,
    [seats.map((data) => data.seatId)],
  );
  return _.every(result, (value) => value.status === 'available');
};

const updateEventSeatDao = async (data, orderNumber) => {
  const { userId, seats, timeId } = data;
  const updateEventSeatsQueryRunner = async (queryRunner) => {
    const seatIds = seats.map((data) => data.seatId);
    await queryRunner.query(
      `UPDATE event_seats
      SET status = 'disabled'
      WHERE seat_id IN (?)
    `,
      [seatIds],
    );
    return { message: 'seat updated' };
  };
  const addOrderQueryRunner = async (queryRunner) => {
    await queryRunner.query(
      `INSERT INTO orders (user_id, order_no, order_status) VALUES (?, ?, ?)`,
      [userId, orderNumber, 'pending'],
    );
    return { orderNumber };
  };
  const addEventOrderByOrderNumberQueryRunner = async (queryRunner) => {
    const [orderId] = await queryRunner.query(getOrderIdByOrderNumberQuery, [
      orderNumber,
    ]);
    const values = seats
      .map((data) => {
        return `(${orderNumber}, '${uuid4()}', ${timeId}, ${data.seatId}, ${orderId.id})`;
      })
      .join(', ');
    await queryRunner.query(
      `INSERT INTO event_orders (order_number, ticket_code, time_id, seat_id, order_id) VALUES ${values}`,
    );
  };
  const result = useTransaction(dataSource, [
    updateEventSeatsQueryRunner,
    addOrderQueryRunner,
    addEventOrderByOrderNumberQueryRunner,
  ]);
  return result;
};

const updateSeatStatusDao = async (seats, orderNumber) => {
  const updateEventOrderQueryRunner = async (queryRunner) => {
    await queryRunner.query(
      `UPDATE orders
      SET order_status = 'canceled'
      WHERE order_no IN (?)
    `,
      [orderNumber],
    );
  };
  const updateEventSeatsQueryRunner = async (queryRunner) => {
    const seatIds = seats.map((data) => data.seatId);
    await queryRunner.query(
      `UPDATE event_seats
      SET status = 'available'
      WHERE seat_id IN (?)
    `,
      [seatIds],
    );
    return { message: 'seat updated' };
  };
  useTransaction(dataSource, [updateEventOrderQueryRunner, updateEventSeatsQueryRunner]);
};
const getOrderNumberBySeatIdDao = async (seats) => {
  const orderNumber = await dataSource.query(
    `
  SELECT order_number FROM event_orders WHERE seat_id IN (?)
  `,
    [seats.map((data) => data.seatId)],
  );
  return orderNumber;
};

const getOrderByUserId = async (userId) => {
  const user = await dataSource.query(
    `
    SELECT
      o.id AS order_id,
      o.order_no AS orderNo,
      o.order_status AS orderStatus,
      e.title AS eventName,
      t.event_time AS eventTime,
      CONCAT(s.row_name, s.col_name) AS seat,
      sg.price AS ticketPrice,
      c.category_name AS categoryName,
      p.name AS performerName,
      pm.method AS paymentMethod,
      pmt.amount AS paymentAmount
    FROM orders AS o
    INNER JOIN event_orders AS eo ON o.id = eo.order_id
    INNER JOIN events AS e ON eo.time_id = e.id  
    INNER JOIN times AS t ON eo.time_id = t.id
    INNER JOIN seats AS s ON eo.seat_id = s.id
    INNER JOIN seat_grades AS sg ON s.grade_id = sg.id
    INNER JOIN categories AS c ON e.category_id = c.id
    INNER JOIN performers AS p ON e.performer_id = p.id
    INNER JOIN payments AS pmt ON o.id = pmt.order_id
    INNER JOIN payment_methods AS pm ON pmt.method_id = pm.id
    WHERE o.user_id = ?;
    `,
    [userId],
  );
  return user;
};

module.exports = {
  getSeatsDataDao,
  isEventExistDao,
  updateEventSeatDao,
  isSeatReservableDao,
  updateSeatStatusDao,
  getOrderNumberBySeatIdDao,
  getOrderByUserId,
};
