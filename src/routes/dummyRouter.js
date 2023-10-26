const express = require('express');
const { dataSource } = require('../models/dataSource');
const { makeSeatDummy, makeEventSeatDummy } = require('../utils/makedummy');
const { addSeatsQuery, addEventSeatsQuery } =
  require('../models').dummyDao.queries;
const router = express.Router();

router.get('/add_seats', async (_, res) => {
  await dataSource.query(addSeatsQuery(makeSeatDummy(20, 30, 1, 4)));
  res.json({
    message: 'seat created',
  });
});
router.get('/add_event_seats', async (_, res) => {
  await dataSource.query(addEventSeatsQuery(makeEventSeatDummy(600)));
  res.json({
    message: 'seat created',
  });
});

module.exports = router;
