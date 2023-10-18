const { userDao } = require('../models');

const orderPass = async (userId) => {
    return await userDao.userOrderPass(userId);
  };

module.exports = {
    orderPass,
};