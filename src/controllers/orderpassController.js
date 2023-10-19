const { orderpassService } = require('../services');
const { throwError } = require('../utils');
const { v4: uuidv4 } = require('uuid');

const userOrderPassController = async (req, res) => {
  const userId = req.userData;
  try {
    const orderpassInfo = await orderpassService.userOrderPassInfo(userId);

    if (!orderpassInfo) {
      throwError(400, 'NOT_FOUND_ORDERPASS');
    }

    res.status(200).json({
      message: 'GET_ORDERPASS',
      data: orderpassInfo,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = {
  userOrderPassController,
};
