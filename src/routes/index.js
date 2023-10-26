const express = require('express');
const router = express.Router();
//const paymentRouter = require('./payment.route');
const promotionRouter = require('./promotion.route');
const ticketRouter = require('./ticketRouter');
const orderRouter = require('./orderRouter');
const dummyRouter = require('./dummyRouter');
const { verificateToken } = require('../middlewares');
// router.get('/', (req, res, next) => {
//   res.send('OK');
// });

//router.use('/payment', paymentRouter);
router.use('/promotion', promotionRouter);
router.use('/dummy', dummyRouter);
router.use('/orders', verificateToken, orderRouter);
router.use('/tickets', ticketRouter);

module.exports = router;

