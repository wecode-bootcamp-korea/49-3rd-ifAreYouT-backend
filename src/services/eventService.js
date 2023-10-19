const { eventDao } = require('../models');

const getLikedEvents = async (userId, reactionType = 'exited') => {
  const likesInfo = eventDao.getUserLikeById(userId, reactionType);

  if (likesInfo.length === 0) {
    throwError(400, 'INVALID_likes');
  }
  return likesInfo;
};

module.exports = {
  getLikedEvents,
};
