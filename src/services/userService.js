const { userDao } = require('../models');

const findUser = async (userId) => {
  return await userDao.findByUserId(userId);
};

const createUser = async (userId, email, birthDate, nickname, phoneNumber, provider, uid) => {
    const adduser = await userDao.createUserinfo(
        userId,
        email,
        birthDate,
        nickname,
        phoneNumber,
        provider,
        uid,
      );
  return  adduser;
};

const updateUser = async (email, birthDate, nickname, phoneNumber, userId) => {
  return await userDao.updateUserinfo(email, birthDate, nickname, phoneNumber, userId);
};

module.exports = {
    findUser,
    createUser,
    updateUser
};
