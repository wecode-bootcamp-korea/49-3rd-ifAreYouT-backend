const { eventDao } = require('../models');

const getLikedEvents = async (userId, reactionType) => {
  const likesInfo = eventDao.getLikedEventsByUserId(userId, reactionType);
  return likesInfo;
};

module.exports = {
  getLikedEvents,
};
