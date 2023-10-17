const express = require('express');
const paymentRouter = require('./payment.route');
//const promotionRouter = require('./promotion.route');
//const promotionRouter = require('./promotion.route');
const router = express.Router();

console.log('he');
router.use('/payment', paymentRouter);
//router.use('/promotion', promotionRouter);

module.exports = router;

