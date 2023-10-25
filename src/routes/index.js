const express = require('express');
//const paymentRouter = require('./payment.route');

const router = express.Router();
const promotionRouter = require('./promotion.route');
const ticketRouter = require('./ticketRouter');

router.get('/', (req, res, next) => {
  res.send('OK');
});

console.log('he');
//router.use('/payment', paymentRouter);
router.use('/promotion', promotionRouter);
router.use('/tickets', ticketRouter);

module.exports = router;

