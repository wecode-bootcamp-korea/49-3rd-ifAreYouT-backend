const { dataSource } = require('./dataSource');
const { useTransaction } = require('../utils');

const isEventExistDao = async (eventId) => {
  const [eventExist] = await dataSource.query(
    `
    SELECT id FROM events WHERE id = ?
    `,
    [eventId],
  );
  return eventExist;
};
const getSeatsDataDao = async (eventId) => {
  const getSeatsQuery = async (queryRunner) => {
    const seats = await queryRunner.query(
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
    return { seats };
  };
  const getDetailsQuery = async (queryRunner) => {
    const detail = await queryRunner.query(
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
    return { detail };
  };
  const result = await useTransaction(dataSource, [
    getSeatsQuery,
    getDetailsQuery,
  ]);
  return result;
};

const updateEventSeatDao = async (datas) => {
  const seatIds = datas.map((data) => data.seatId);
  await dataSource.query(
    `UPDATE event_seats
      SET status = 'disabled'
      WHERE seat_id IN (?)
    `,
    [seatIds],
  );
  return 'seat updated';
};

module.exports = { getSeatsDataDao, isEventExistDao, updateEventSeatDao };
