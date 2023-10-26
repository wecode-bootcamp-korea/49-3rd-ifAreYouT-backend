const express = require('express');
const orderRouter = require('./orderRouter');
const dummyRouter = require('./dummyRouter');
const { verificateToken } = require('../middlewares');
const ticketRouter = require('./ticketRouter');
const router = express.Router();
const { verificateToken } = require('../middlewares');

router.get('/', (req, res) => {
  res.send('OK');
});
router.use('/dummy', dummyRouter);
router.use('/orders', verificateToken, orderRouter);
router.use('/tickets', verificateToken, ticketRouter);

module.exports = router;
