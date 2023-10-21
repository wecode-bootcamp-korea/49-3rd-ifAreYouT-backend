const { preorderpassDao } = require('../models');

const getUserOrderPassByUserId = async (userId, preorderPassesId) => {
  const orderpassInfo = preorderpassDao.getUserPreorderPassByUserId(userId, preorderPassesId);
  return orderpassInfo;
};

module.exports = {
  getUserOrderPassByUserId,
};
