const { orderlistService } = require('../services');
const { throwError } = require('../utils');
const { v4: uuidv4 } = require('uuid');

const userCheckOrderController = async (req, res) => {
  const userId = req.params.userId;
  try {
    const checkUserOrder = await orderlistService.getCheckOrderList(userId);

    if (!checkUserOrder || checkUserOrder.length === 0) {
      throwError(400, 'PURCHASE_HISTORY_NOT_FOUND');
    }

    res.status(200).json({
      message: 'GET_ORDER',
      data: checkUserOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = {
  userCheckOrderController,
};
