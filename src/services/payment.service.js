const { paymentDao } = require('../models');

const putPaymentInfo = async (
  userId,
  amount,

  orderNumber,
) => {
  const data = await paymentDao.putPaymentInfo(
    userId,
    amount,

    orderNumber,
  );
  // if (!res) {
  //   const error = new Error("NO PRODUCT");
  //   error.status = 400;
  //   throw error;
  // }
  console.log('service-he');
  // const ans = await productDao.showMain(req,res);//231002return을 어떻게 하는지
  return data;
};

module.exports = {
  putPaymentInfo,
};
