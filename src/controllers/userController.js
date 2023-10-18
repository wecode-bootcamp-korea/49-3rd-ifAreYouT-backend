const { userService } = require('../services');
const { throwError } = require('../utils');
const { v4: uuidv4 } = require('uuid');

const userTicketsController = async (req, res) => {
  const userId = req.params.userId;
  try {
    const isOrderValid = await userService.isOrderValid(userId);

    if (!isOrderValid) {
      throwError(400, 'INVALID_ORDER_ID');
    }
    const result = await userService.userTickets({ userId });
    res.status(200).json({
      message: 'GET_TICKETS',
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const CheckOrderController = async (req, res) => {
  const userId = req.params.userId;
  try {
    const checkUserOrder = await userService.CheckOrder(userId);

    if (!checkUserOrder || checkUserOrder.length === 0) {
      throwError(400, 'PURCHASE_HISTORY_NOT_FOUND');
    }

    res.status(200).json({
      message: 'GET_ORDER',
      data: checkUserOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const userByLikeController = async (req, res) => {
  const userId = req.params.userId;
  try {
    const likedEvents = await userService.getLikedEvents(userId);

    if (likedEvents.length === 0) {
      throwError(400, 'NOT_FOUND_LIKES')
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
  userTicketsController,
  CheckOrderController,
  userByLikeController
};
