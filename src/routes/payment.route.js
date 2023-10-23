const express = require("express"); 
const { paymentController } = require("../controllers");
const paymentRouter = express.Router();
console.log('hey');
paymentRouter.get('/payment/:methods', paymentController.putPaymentInfo);

module.exports = paymentRouter;
