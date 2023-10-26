const { likesDao } = require('../models');

const getLikedEvents = async (userId, reactionType) => {
  const likesInfo = likesDao.getLikedEventsByUserId(userId, reactionType);
  return likesInfo;
};

module.exports = {
  getLikedEvents,
};