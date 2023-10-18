const { orderlistDao } = require('../models');

const CheckOrder = async (userId) => {
  return await orderlistDao.userCheckOrder(userId);
};

module.exports = {
  CheckOrder
};
