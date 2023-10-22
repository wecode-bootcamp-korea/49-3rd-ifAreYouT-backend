const { isEmpty } = require('lodash');
const { preorderpassService } = require('../services');
const { throwError } = require('../utils');
const { v4: uuidv4 } = require('uuid');

const getUserPreorderPassByUserId = async (req, res, next) => {
  const userId = req.userdata ? req.userData.id : undefined;
  const { preorderPassesId } = req.query;
  try {
    const getPreorderPassId = await preorderpassService.getUserPreorderPassId(preorderPassesId);
    if (isEmpty(getPreorderPassId)) 
      {throwError(400, 'NOT_FOUND_ORDERPASSID')};

    const hasPreorderPass = await preorderpassService.getUserOrderPassByUserId(userId, preorderPassesId);

    if (hasPreorderPass) {
      res.status(200).json({
        message: 'GET_ORDERPASS',
        has_preorder_pass: 1,
     });
    } else {
      res.status(400).json({
        message: 'NOT_FOUND_ORDERPASS',
        has_preorder_pass: 0,
     });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getUserPreorderPassByUserId,
};
