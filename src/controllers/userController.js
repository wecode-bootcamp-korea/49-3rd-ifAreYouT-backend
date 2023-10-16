const { userService } = require('../services');
const { throwError } = require('../utils');
const { v4: uuidv4 } = require('uuid');

const createUserController = async (req, res) => {
  const uid = uuidv4();
  const provider = "KAKAO";
  const { email, nickname, phoneNumber } = req.body;

  if (!email || !nickname || !phoneNumber || !provider)
    throwError(400, 'KEY_ERROR');

  try {
    await userService.createUser({
      email,
      nickname,
      phoneNumber,
      provider,
      uid,
    });
    return res.status(200).json({
      message: 'SUCCESS',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const updateUserController = async (req, res) => {
  // userId 찾는거는 추후
  const foundUser = req.foundUser;
  const userId = foundUser ? foundUser.id : undefined;
  const { email, nickname, phoneNumber } = req.body;
  if (!email || !nickname || !phoneNumber) {
    throwError(400, 'KEY_ERROR');
  }
  try {
    const userData = await userService.updateUser({
      email,
      nickname,
      phoneNumber,
      userId,
    });
    res.status(200).json({
      message: 'UPDATE_USER',
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const userTicketsController = async (req, res) => {
  const userId = req.params.userId;
  const orderId = req.params.orderId;
  try {
    const isOrderValid = await userService.isOrderValid(userId, orderId);

    if (!isOrderValid) {
      throwError(400, 'INVALID_ORDER_ID');
    }
    const result = await userService.userTickets({ userId, orderId });
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

    res.status(200).json({ data: checkUserOrder });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const userByLikeController = async (req, res) => {
  const userId = req.params.userId;
  const eventId = req.params.eventId;
  try {
    const isLiked = await userService.userByLike(userId, eventId);
    if (isLiked) {
      res.status(200).json({
        message: 'LIKED',
        data: {
          isLiked: true,
        },
      });
    } else {
      res.status(400).json({
        message: 'NOT_LIKED',
        data: {
          isLiked: false,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const orderPassController = async (req, res) => {
  const userId = req.params.userId;
  try {
    const hasOrderPass = await userService.orderPass(userId);

    if (hasOrderPass) {
      res.status(200).json({
        message: 'HAS_ORDER_PASS',
        data: {
          hasOrderPass: true,
        },
      });
    } else {
      res.status(200).json({
        message: 'NO_ORDER_PASS',
        data: {
          hasOrderPass: false,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = {
  createUserController,
  updateUserController,
  userTicketsController,
  CheckOrderController,
  userByLikeController,
  orderPassController,
};
