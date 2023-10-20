const { eventService } = require('../services');
const { throwError } = require('../utils');
const { v4: uuidv4 } = require('uuid');

const getLikedEventsByUser = async (req, res, next) => {
  const userId = req.userData;
  const reactionType = req.query['reaction-type'] || 'exited';
  try {
    const likesInfo = await eventService.getLikedEvents(userId, reactionType);

    if (!likesInfo || likesInfo.length === 0) {
      throwError(400, 'LIKED_EVENTS_NOT_FOUND');
    }

    res.status(200).json({
      message: 'LIKED_EVENTS_FOUND',
      data: likesInfo,
    });
    next();
  } catch (error) {
    console.log(error);
    next(error)
    return res.status(500).json(error);
  }
};

module.exports = {
  getLikedEventsByUser,
};
