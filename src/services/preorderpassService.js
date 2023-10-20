const { preorderpassDao } = require('../models');
const { throwError } = require('../utils');

const getUserOrderPassByUserId = async (userId) => {
  const orderpassInfo = preorderpassDao.getUserPreorderPassByUserId(userId);
  if (orderpassInfo.length === 0) {
    throwError(400, 'INVALID_ORDER');
  }
  return orderpassInfo;
};

module.exports = {
  getUserOrderPassByUserId,
};
