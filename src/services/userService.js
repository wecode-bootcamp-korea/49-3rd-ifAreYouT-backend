const { userDao } = require('../models');

const isOrderValid = async (userId) => {
  try {
    const order = await userDao.userGetTickets(userId);

    if (order && order.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking order validity:', error);
    throw error;
  }
};

const userTickets = async (body) => {
  const { userId } = body;
  return await userDao.userGetTickets(userId);
};

const CheckOrder = async (userId) => {
  return await userDao.userCheckOrder(userId);
};

const getLikedEvents = async (userId) => {
  return await userDao.userLike(userId);
};

module.exports = {
  isOrderValid,
  userTickets,
  CheckOrder,
  getLikedEvents
};
