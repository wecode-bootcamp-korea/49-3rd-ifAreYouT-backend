const { userService } = require('../services');
const { throwError } = require('../utils');
const { v4: uuidv4 } = require('uuid');

const orderPassController = async (req, res) => {
    const userId = req.params.userId;
    try {
      const hasOrderPass = await userService.orderPass(userId);
  
      if (hasOrderPass) {
        res.status(200).json({
          message: 'HAS_ORDER_PASS',
          data: {
            hasOrderPass: true,
          },
        });
      } else {
        res.status(200).json({
          message: 'NO_ORDER_PASS',
          data: {
            hasOrderPass: false,
          },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  };

module.exports = {
  orderPassController,
};