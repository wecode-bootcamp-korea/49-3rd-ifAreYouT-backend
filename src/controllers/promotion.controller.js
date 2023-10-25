const { promotionService } = require('../services');

const getQuestionsByPromoId = async (req, res) => {
  try {
    //const userId = req.userId;
    const { promotionId } = req.params;
    console.log('hi', promotionId);
    const data = await promotionService.getQuestionsByPromoId(promotionId);
    res.status(201).json({
      message: 'QUESTIONS SELECTED',
      data: data,
    });
  } catch (error) {
    console.log('error!', error);
    res.status(error.status).json({ message: error.message });
  }
};
const putPreorderPass = async (req, res) => {
  try {
    const { userId } = req.userData;
    const { promotionId } = req.params;
    const { eventId, ans } = req.body;
    console.log(ans);
    const data = await promotionService.putPreorderPass(
      userId,
      eventId,
      promotionId,
      ans,
    );
    res.status(201).json({
      message: data,
    });
  } catch (error) {
    console.log('error!', error);
    res.status(error.status).json({ message: error.message });
  }
};
module.exports = {
  getQuestionsByPromoId,
  putPreorderPass,
};
