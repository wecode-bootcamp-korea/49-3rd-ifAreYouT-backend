const { orderDao } = require('../models');

const getOrderByUserId = async (userId) => {
  return await orderDao.getUserByOrder(userId);
};

module.exports = {
  getOrderByUserId
};
