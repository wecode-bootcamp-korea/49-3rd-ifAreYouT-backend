const {paymentService} = require("../services");

const putPaymentInfo = async (req, res) => {
  try {
    const data = await paymentService.putPaymentInfo();
    res.status(201).json({
      message: 'PAYMENT INFO SUCCESS',
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
