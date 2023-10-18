const { orderlistDao } = require('../models');

const getCheckOrderList = async (userId) => {
  return await orderlistDao.getUserCheckOrder(userId);
};

module.exports = {
  getCheckOrderList
};
