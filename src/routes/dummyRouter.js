const { dataSource } = require('../utils');

const express = require('express');
const { makeSeatDummy, makeEventSeatDummy } = require('../utils/makeDummy');
const router = express.Router();

router.get('/add_seats', async (_, res) => {
  await dataSource.query(`
    INSERT INTO seats (row_name, col_name, stage_id, grade_id) VALUES ${makeSeatDummy(
      20,
      30,
      1,
      4,
    )}
    `);
  res.json({
    message: 'seat created',
  });
});
router.get('/add_event_seats', async (_, res) => {
  await dataSource.query(`
    INSERT INTO event_seats (status, event_id, seat_id) VALUES ${makeEventSeatDummy(
      600,
    )}
    `);
  res.json({
    message: 'seat created',
  });
});

module.exports = router;
