const { paymentDao } = require('../models');

const putPaymentInfo = async (
  data,
  // amount,
  // orderNumber,
) => {
  const data1 = await paymentDao.putPaymentInfo(data);
  // if (!res) {
  //   const error = new Error("NO PRODUCT");
  //   error.status = 400;
  //   throw error;
  // }
  // const ans = await productDao.showMain(req,res);//231002return을 어떻게 하는지
  return data1;
};

module.exports = {
  putPaymentInfo,
};
