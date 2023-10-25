const { preorderpassService } = require('../services');
const { throwError } = require('../utils');

const getUserPreorderPassByUserId = async (req, res, next) => {
  const { userId } = req.userData;
  try {
    const hasPreorderPass = await preorderpassService.getUserOrderPassByUserId(userId);
    
    if (!hasPreorderPass.length) {
      throwError(400, 'NOT_FOUND_ORDERPASS');
    }

    res.status(200).json({
      message: 'FOUND_ORDERPASS',
      data: hasPreorderPass,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getUserPreorderPassByUserId,
};
