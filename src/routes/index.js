const express = require('express');
const orderRouter = require('./orderRouter');
const dummyRouter = require('./dummyRouter');
const { verificateToken } = require('../middlewares');
const ticketRouter = require('./ticketRouter');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('OK');
});
router.use('/dummy', dummyRouter);
router.use('/orders', verificateToken, orderRouter);
router.use('/tickets', ticketRouter);

module.exports = router;
