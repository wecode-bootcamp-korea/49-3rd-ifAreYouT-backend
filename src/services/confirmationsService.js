const { userDao } = require('../models');

const getLikedEvents = async (userId) => {
  return await userDao.userLike(userId);
};

module.exports = {
  getLikedEvents,
};
