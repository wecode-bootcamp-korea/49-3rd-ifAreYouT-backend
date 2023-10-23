const { preorderpassService } = require('../services');
const { throwError } = require('../utils');

const getUserPreorderPassByUserId = async (req, res, next) => {
  const { userId } = req.query;
  const { preorderPassesId } = req.query;
  try {
    const hasPreorderPass = await preorderpassService.getUserOrderPassByUserId(userId, preorderPassesId);

    if (!hasPreorderPass || hasPreorderPass.length === 0) {
      throwError(400, 'NO_DATA_ORDERPASS');
    }

    if (hasPreorderPass) {
      res.status(200).json({
        message: 'FOUND_ORDERPASS',
        has_preorder_pass: 1,
     });
    } else {
      res.status(200).json({
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
