const express = require("express"); 
const { paymentController } = require("../controllers");
const paymentRouter = express.Router();

paymentRouter.get("/payment/:methods",paymentController.showPaymentMethods);
//paymentRouter.get("/payment/:options", paymentController.showPaymentOptions);
paymentRouter.get("/payment/calcelFeeAgreement", paymentController.showCalcelFeeAgreement);


module.exports = { paymentRouter };
