const { makeSeatDummy, makeEventSeatDummy } = require('../../utils/makeDummy');
const { dataSource } = require('../dataSource');

const addSeatsDao = async () => {
  await dataSource.query(`
INSERT INTO seats (row_name, col_name, stage_id, grade_id) VALUES ${makeSeatDummy(
    20,
    30,
    1,
    4,
  )}
`);
  return 'ok';
};
const addEventSeatsDao = async () => {
  await dataSource.query(`
    INSERT INTO event_seats (status, event_id, seat_id) VALUES ${makeEventSeatDummy(
      600,
    )}
    `);
  return 'ok';
};

module.exports = {
  addSeatsDao,
  addEventSeatsDao,
};
