const { promotionDao } = require('../models');

const showPaymentMethods = async () => {
  const data = await productDao.showPaymentMethods();
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
  showPaymentMethods,
};
