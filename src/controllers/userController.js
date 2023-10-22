const { userService } = require('../services');
const { throwError } = require('../utils');
const { v4: uuidv4 } = require('uuid');

const createUserController = async (req, res, next) => {
//   const uid = req.body.uid;
  const provider = req.body.provider;
//   const provider = 'kakao';
  const uid = uuidv4();
  const { email, birthDate, nickname, phoneNumber } = req.body;

  if (!email || !nickname || !phoneNumber || !provider) {
    throwError(400, 'KEY_ERROR');
  }
  try {
    await userService.createUser(
      email,
      birthDate,
      nickname,
      phoneNumber,
      provider,
      uid,
    );
    return res.status(200).json({
      message: 'SUCCESS',
      data: {
        email: email,
        nickname: nickname,
        phoneNumber: phoneNumber,
        provider: provider,
        uid: uid
    },
    });
  } catch (error) {
    next(error);
  }
};

const updateUserController = async (req, res, next) => {
  const { userId } = req.query;
  const { email, birthDate, nickname, phoneNumber } = req.body;
  if (!email || !nickname || !phoneNumber) {
    throwError(400, 'KEY_ERROR');
  }
  try {
    await userService.updateUser(
      email,
      birthDate,
      nickname,
      phoneNumber,
      userId,
    );
    res.status(200).json({
      message: 'UPDATE_USER',
      data: {
        email: email,
        nickname: nickname,
        phoneNumber: phoneNumber,
        userId: userId
    } 
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUserController,
  updateUserController,
};
