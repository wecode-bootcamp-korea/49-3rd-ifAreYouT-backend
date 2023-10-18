const express = require('express');
const orderRouter = require('./orderRouter');
const dummyRouter = require('./dummyRouter');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('OK');
});
router.use('/dummy', dummyRouter);
router.use('/orders', orderRouter);

module.exports = router;
