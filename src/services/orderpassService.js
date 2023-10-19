const { orderpassDao } = require('../models');
const { throwError } = require('../utils');

const userOrderPassInfo = async (userId) => {
  const orderpassInfo = orderpassDao.getUserPreorderPassByUserId(userId);
  if (orderpassInfo.length === 0) {
    throwError(400, 'INVALID_ORDER');
  }
  return orderpassInfo;
};

module.exports = {
  userOrderPassInfo,
};
