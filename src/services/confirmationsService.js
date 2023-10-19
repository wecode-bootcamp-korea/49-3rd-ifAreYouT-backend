const { confirmationsDao } = require('../models');

const getLikedEvents = async (userId) => {
  const likesInfo = confirmationsDao.getUserLikeById(userId)

  if (likesInfo.length === 0) {
    throwError(400, 'INVALID_likes');
  }
  const modifiedLikesInfo = likesInfo.map((event) => {
    const {
      event_id,
      event_name,
      event_date,
      location,
      performer,
      category,
      image_url,
    } = event;
    return {
      event_id,
      event_name,
      event_date,
      location,
      performer,
      category,
      image_url,
    };
  });

  return modifiedLikesInfo;
};


module.exports = {
  getLikedEvents,
};
