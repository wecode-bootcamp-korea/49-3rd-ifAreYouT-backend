const express = require('express');
const paymentRouter = require('./payment.route');
const ticketRouter = require("./ticketRouter");
//const promotionRouter = require('./promotion.route');
//const promotionRouter = require('./promotion.route');
const router = express.Router();

console.log('he');
router.use('/payment', paymentRouter);
router.use('/promotion', promotionRouter);
router.use('/tickets', ticketRouter);


router.get('/', (req, res, next) => {
  res.send('OK');
});



module.exports = router;

