const { confirmationsDao } = require('../models');

const getLikedEvents = async (userId) => {
  const likesInfo = confirmationsDao.getUserLikeById(userId)

  if (likesInfo.length === 0) {
    throwError(400, 'INVALID_likes');
  }
  return likesInfo;
};

module.exports = {
  getLikedEvents,
};
