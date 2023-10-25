const { preorderpassDao } = require('../models');

const getUserOrderPassByUserId = async (userId) => {
  const orderpassInfo = preorderpassDao.getUserPreorderPassByUserId(userId);
  return orderpassInfo;
};

module.exports = {
  getUserOrderPassByUserId,
};
