const { orderDao } = require('../models');
const { throwError } = require('../utils');

const getOrderByUserId = async (userId) => {
  const orderInfo = orderDao.getOrderByUserId(userId);
  if (orderInfo.length === 0) {
    throwError(400, 'INVALID_ORDER');
  }
  return orderInfo;
};

module.exports = {
  getOrderByUserId
};
