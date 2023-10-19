const express = require('express');
const orderRouter = require('./orderRouter');
const dummyRouter = require('./dummyRouter');
const { verificateToken } = require('../middlewares');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('OK');
});
router.use('/dummy', dummyRouter);
router.use('/orders', verificateToken, orderRouter);

module.exports = router;
