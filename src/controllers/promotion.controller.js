const { promotionService } = require('../services');

const showPromotion = async (req, res) => {
  try {
    const userId = req.userId;
    const { eventId, performerId } = req.body;
    const data = await promotionService.showPromotion(
      userId,
      eventId,
      performerId,
    );
    res.status(201).json({
      message: 'QUESTIONS SELECTED',
      data: data,
    });
  } catch (error) {
    console.log('error!', error);
    res.status(error.status).json({ message: error.message });
  }
};
const isPreorderPass = async (req, res) => {
  try {
    const { ans1, ans2, ans3, ans4, ans5 } = req.body;
    const data = await promotionService.isPreorderPass(
      ans1,
      ans2,
      ans3,
      ans4,
      ans5,
    );
    res.status(201).json({
      message: 'PREORDERPASS Y/N',
      data: data,
    });
  } catch (error) {
    console.log('error!', error);
    res.status(error.status).json({ message: error.message });
  }
};
module.exports = {
  showPromotion,
  isPreorderPass,
};
