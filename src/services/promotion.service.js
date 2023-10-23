const { promotionDao } = require('../models');

const getQuestionsByPromoId = async (promotionId) => {
  const data = await promotionDao.getQuestionsByPromoId(promotionId);
  console.log('service-showPromoQ');
  //프로모션아이디가 없을 때 예외처리
  return data;
};
const putPreorderPass = async (map) => {
  const data = await promotionDao.putPreorderPass(map);
  console.log('service-showPromoQ');
  return data;
};

module.exports = {
  getQuestionsByPromoId,
  putPreorderPass,
};
