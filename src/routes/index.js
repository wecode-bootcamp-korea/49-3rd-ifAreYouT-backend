const express = require('express');
const paymentRouter = require('./payment.route');
//const promotionRouter = require('./promotion.route');
const orderRouter = require('./orderRouter');
const dummyRouter = require('./dummyRouter');
const { verificateToken } = require('../middlewares');
const ticketRouter = require('./ticketRouter');
const router = express.Router();
const { eventRouter } = require('./eventRoute');
const likesRouter = require('./likesRouter');
const preorderpassRouter = require("./preorderpassRouter");
router.get('/', (req, res) => {
  res.send('OK');
});

router.use('/payment', paymentRouter);
//router.use('/promotion', promotionRouter);
router.use('/events', eventRouter);
router.use('/likes', verificateToken, likesRouter);
router.use('/dummy', dummyRouter);
router.use('/orders', verificateToken, orderRouter);
router.use('/tickets', verificateToken, ticketRouter);
router.use('/preorder-pass', verificateToken, preorderpassRouter)

module.exports = router;

