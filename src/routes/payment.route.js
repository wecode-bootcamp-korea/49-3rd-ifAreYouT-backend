const express = require("express"); 
const { paymentController } = require("../controllers");
const paymentRouter = express.Router();
console.log('ho');
paymentRouter.get('/payment/:methods', paymentController.showPaymentMethods);

module.exports = paymentRouter;
