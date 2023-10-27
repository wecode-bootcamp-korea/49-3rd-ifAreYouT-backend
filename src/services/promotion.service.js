const { promotionDao } = require('../models');

const getQuestionsByPromoId = async (promotionId) => {
  const data = await promotionDao.getQuestionsByPromoId(promotionId);
  console.log('service-showPromoQ');
  //프로모션아이디가 없을 때 예외처리
  return data;
};
const putPreorderPass = async (userId, eventId, promotionId, ans) => {
  const data = await promotionDao.putPreorderPass(
    eventId,
    promotionId,
    userId,
    ans,
  );
  console.log('service-showPromoQ');
  return data;
};

module.exports = {
  getQuestionsByPromoId,
  putPreorderPass,
};
