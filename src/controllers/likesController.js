const { likesService } = require('../services');
const { throwError } = require('../utils');

const getLikedEventsByUser = async (req, res, next) => {
  const { userId } = req.userData.data;
  const { reactionType } = req.query;
  try {
    const likesInfo = await likesService.getLikedEvents(userId, reactionType);

    if (!likesInfo || likesInfo.length === 0) {
      throwError(400, 'LIKED_EVENTS_NOT_FOUND');
    }

    return res.status(200).json({
      message: 'LIKED_EVENTS_FOUND',
      data: likesInfo,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getLikedEventsByUser,
};
