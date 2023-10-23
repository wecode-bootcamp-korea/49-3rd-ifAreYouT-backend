const { promotionService } = require('../services');

const getQuestionsByPromoId = async (req, res) => {
  try {
    //const userId = req.userId;
    const { promotionId } = req.params;
    // const { promotionId } = req.params.promotionId; //get메소드는 body 실을수없음 231
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
    const { promotionId } = req.params;
    console.log('promoid', promotionId);
    const { ans } = req.body;
    console.log('ans', ans);
    const map = Object.values(ans);
    console.log(map);
    const data = await promotionService.putPreorderPass(promotionId, map);
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
  getQuestionsByPromoId,
  putPreorderPass,
};
