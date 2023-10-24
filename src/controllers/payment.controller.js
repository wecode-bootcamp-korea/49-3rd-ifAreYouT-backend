const {paymentService} = require("../services");
const { throwError } = require('../utils');

const putPaymentInfo = async (req, res) => {
  const { userId } = req.userData;
  console.log('userid', userId);

  const { amount, orderNumber } = req.body;
  console.log(req.body);
  try {
    const data = await paymentService.putPaymentInfo(
      userId,
      amount,
      orderNumber,
    );
    res.status(201).json({
      message: 'PAYMENT SUCCESS',
      data: data,
    });
  } catch (error) {
    console.log('error!', error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  putPaymentInfo,
};
