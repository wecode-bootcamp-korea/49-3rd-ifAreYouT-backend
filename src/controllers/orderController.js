const { orderService } = require('../services');
const { throwError } = require('../utils');
const { v4: uuidv4 } = require('uuid');

const getUserOrder = async (req, res) => {
  const userId = req.userData
  try {
    const orderInfo = await orderService.getOrderByUserId(userId);

    if (!orderInfo) {
      throwError(400, 'NOT_FOUND_ORDER');
    }
    res.status(200).json({
      message: 'GET_ORDER',
      data: orderInfo,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = {
  getUserOrder,
};
