const { promotionService } = require('../services');

const showPromotion = async (req, res) => {
  try {
    //const userId = req.userId;
    const { promotionId } = req.body;
    console.log(promotionId);
    const data = await promotionService.showPromotion(promotionId);
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
      //231018 메세지 빌더 방법이 없을까
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
