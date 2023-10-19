const { orderpassDao } = require('../models');
const { throwError } = require('../utils');

const CheckOrder = async (userId) => {
  return await orderpassDao.userCheckOrder(userId);
};

module.exports = {
  CheckOrder,
};
