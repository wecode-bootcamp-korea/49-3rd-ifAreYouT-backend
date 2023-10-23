const { userDao } = require('../models');

const createUser = async (userId, email, nickname, phoneNumber, provider, uid) => {
    const adduser = await userDao.createUserinfo(userId,email,nickname,phoneNumber,provider,uid);
  return  adduser;
};

const updateUser = async (email, birthDate, nickname, phoneNumber, userId) => {
  return await userDao.updateUserinfo(email, birthDate, nickname, phoneNumber, userId);
};

module.exports = {
    createUser,
    updateUser
};
