const { orderService } = require('../services');
const { throwError } = require('../utils');

const getUserOrder = async (req, res, next) => {
  const { userId } = req.query;
  try {
    const orderInfo = await orderService.getOrderByUserId(userId);

    if (!orderInfo || orderInfo.length === 0) {
      throwError(400, 'NOT_FOUND_ORDER');
    }
    res.status(200).json({
      message: 'GET_ORDER',
      data: orderInfo,
    });
  } catch (error) {
    console.log(error);
    next(error)
  }
};

module.exports = {
  getUserOrder,
};
