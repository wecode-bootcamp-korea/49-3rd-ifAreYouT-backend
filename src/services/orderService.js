const { orderDao } = require('../models');

const getOrderByUserId = async (userId) => {
  const orderInfo = orderDao.getOrderByUserId(userId);
  return orderInfo;
};

module.exports = {
  getOrderByUserId
};
