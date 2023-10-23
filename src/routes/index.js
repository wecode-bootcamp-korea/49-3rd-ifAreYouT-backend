const express = require('express');
//const paymentRouter = require('./payment.route');
const promotionRouter = require('./promotion.route');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('OK');
});

console.log('he');
//router.use('/payment', paymentRouter);
router.use('/promotion', promotionRouter);

module.exports = router;

