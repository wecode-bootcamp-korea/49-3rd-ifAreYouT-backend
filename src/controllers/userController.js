const { userService } = require('../services');
const { throwError } = require('../utils');
const { v4: uuidv4 } = require('uuid');

const userTicketsController = async (req, res) => {
  const userId = req.params.userId;
  try {
    const isOrderValid = await userService.isOrderValid(userId);

    if (!isOrderValid) {
      throwError(400, 'INVALID_ORDER_ID');
    }
    const result = await userService.userTickets({ userId });
    res.status(200).json({
      message: 'GET_TICKETS',
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = {
  userTicketsController
};
