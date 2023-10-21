const { preorderpassService } = require('../services');
const { throwError } = require('../utils');
const { v4: uuidv4 } = require('uuid');

const getUserPreorderPassByUserId = async (req, res, next) => {
  const userId = req.userData;
  const { preorderPassesId } = req.query;
  try {
    const orderpassInfo = await preorderpassService.getUserOrderPassByUserId(userId, preorderPassesId);

    if (!orderpassInfo) {
      throwError(400, 'NOT_FOUND_ORDERPASS');
    }

    res.status(200).json({
      message: 'GET_ORDERPASS',
      data: orderpassInfo,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getUserPreorderPassByUserId,
};
