const {paymentService} = require("../services");

const showPaymentMethods = async (req, res) => {
  try {
    const data = await paymentService.showMain();
    res.status(201).json({
      message: 'PAYMENT METHOD SELECTED',
      data: data,
    });
  } catch (error) {
    console.log('error!', error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  showPaymentMethods,
};
