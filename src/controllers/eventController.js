const { eventService } = require('../services');
const { throwError } = require('../utils');

const getLikedEventsByUser = async (req, res, next) => {
  const { userId } = req.query;
  const { reactionType } = req.query;
  try {
    const likesInfo = await eventService.getLikedEvents(userId, reactionType);

    if (!likesInfo || likesInfo.length === 0) {
      throwError(400, 'LIKED_EVENTS_NOT_FOUND');
    };
    
    if (reactionType === 'unexited') {
      throwError(400,'EVENT_UNEXITED');
    }

    res.status(200).json({
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
