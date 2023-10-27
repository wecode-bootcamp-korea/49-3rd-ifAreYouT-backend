const { dataSource } = require('./dataSource');

const putPaymentInfo = async (data) => {
  console.log('dao-putpaymentinfo');
  console.log('orderno', orderNumber);
  const { userId, amount, orderNumber, seats } = data;
  const order_id = await dataSource.query(
    `SELECT ID FROM ORDERS WHERE order_no = '${orderNumber}'`,
  );
  console.log('order_id', order_id);
  const order_id_selected = order_id[0].ID;

  console.log('order_id_selected', order_id_selected);
  const status = 'SUCCESS';
  const data2 = await dataSource.query(`
  INSERT INTO payments (user_id,amount, status,order_id, method_id)
    VALUES (${userId},${amount},'${status}',${order_id_selected},1)
  `);
};
module.exports = {
  putPaymentInfo,
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
        return `(${orderNumber}, '${uuid4()}', ${timeId}, ${data.seatId}, ${
          orderId.id
        })`;
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
  useTransaction(dataSource, [
    updateEventOrderQueryRunner,
    updateEventSeatsQueryRunner,
  ]);
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


