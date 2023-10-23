const express = require("express"); 
const { paymentController } = require("../controllers");
const { verificateToken } = require('../middlewares');
const paymentRouter = express.Router();
console.log('hey');

paymentRouter.post('/', verificateToken, paymentController.putPaymentInfo);

module.exports = paymentRouter;
