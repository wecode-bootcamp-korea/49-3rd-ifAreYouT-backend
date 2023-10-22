const { preorderpassDao } = require('../models');

const getUserPreorderPassId = async (preorderPassesId) => {
  const getPreorderPassId = preorderpassDao.findUserByPreorderPassId(preorderPassesId);
  return getPreorderPassId;
};

const getUserOrderPassByUserId = async (userId, preorderPassesId) => {
  const orderpassInfo = preorderpassDao.getUserPreorderPassByUserId(userId, preorderPassesId);
  return orderpassInfo;
};

module.exports = {
  getUserOrderPassByUserId,
  getUserPreorderPassId,
};
