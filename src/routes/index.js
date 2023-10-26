const express = require('express');
const orderRouter = require('./orderRouter');
const dummyRouter = require('./dummyRouter');
const { verificateToken } = require('../middlewares');
const ticketRouter = require('./ticketRouter');
const router = express.Router();
const { eventRouter } = require('./eventRoute');

router.get('/', (req, res, next) => {
  res.send('OK');
});

router.use('/events', eventRouter);
router.use('/dummy', dummyRouter);
router.use('/orders', verificateToken, orderRouter);
router.use('/tickets', verificateToken, ticketRouter);

module.exports = router;
