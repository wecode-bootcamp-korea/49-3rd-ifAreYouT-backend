const { orderService } = require('../services');
const { throwError } = require('../utils');

const getUserOrder = async (req, res, next) => {
  const { userId } = req.userData;
  console.log(userId)
  try {
    const orderInfo = await orderService.getOrderByUserId(userId);

    console.log(orderInfo)

    if (!orderInfo || orderInfo.length === 0) {
      throwError(400, 'NOT_FOUND_ORDER');
    }
    return res.status(200).json({
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
