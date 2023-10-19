const { orderService } = require('../services');
const { throwError } = require('../utils');
const { v4: uuidv4 } = require('uuid');

const getUserOrderController = async (req, res) => {
  const userId = req.userData
  try {
    const getUserOrder = await orderService.getOrderByUserId(userId);

    if (!getUserOrder || getUserOrder.length === 0) {
      throwError(400, 'PURCHASE_HISTORY_NOT_FOUND');
    }

    res.status(200).json({
      message: 'GET_ORDER',
      data: getUserOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = {
  getUserOrderController,
};
