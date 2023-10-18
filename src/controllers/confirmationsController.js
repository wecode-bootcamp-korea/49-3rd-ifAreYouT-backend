const { confirmationsService } = require('../services');
const { throwError } = require('../utils');
const { v4: uuidv4 } = require('uuid');

const userByLikeController = async (req, res) => {
  const userId = req.params.userId;
  try {
    const likedEvents = await confirmationsService.getLikedEvents(userId);

    if (likedEvents.length === 0) {
      throwError(400, 'NOT_FOUND_LIKES');
    }

    res.status(200).json({
      message: 'LIKED_EVENTS_FOUND',
      data: likedEvents,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = {
  userByLikeController,
};
