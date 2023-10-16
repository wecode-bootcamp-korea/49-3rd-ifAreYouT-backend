const { userDao } = require('../models');

const findUser = async (userId) => {
  return await userDao.findByUserId(userId);
};

const createUser = async (body) => {
  const { email, nickname, phoneNumber, provider, uid } = body;
  await userDao.createUserinfo(email, nickname, phoneNumber, provider, uid);
};

const updateUser = async (body) => {
  const { email, nickname, phoneNumber, userId } = body;
  return await userDao.updateUserinfo(email, nickname, phoneNumber, userId);
};

const isOrderValid = async (userId, orderId) => {
  try {
    const order = await userDao.userGetTickets(userId, orderId);

    if (order.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking order validity:', error);
    throw error;
  }
};

const userTickets = async (body) => {
  const { userId, orderId } = body;
  return await userDao.userGetTickets(userId, orderId);
};

const CheckOrder = async (userId) => {
  return await userDao.userCheckOrder(userId);
};

const userByLike = async (userId, eventId) => {
  return await userDao.userLike(userId, eventId);
};

const orderPass = async (userId) => {
  return await userDao.userOrderPass(userId);
};

module.exports = {
  findUser,
  createUser,
  updateUser,
  isOrderValid,
  userTickets,
  CheckOrder,
  userByLike,
  orderPass,
};
