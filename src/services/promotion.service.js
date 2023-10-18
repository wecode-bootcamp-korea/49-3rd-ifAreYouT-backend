const {promotionDao} = require("../models");

const showPromotion = async (promotionId) => {
  const data = await promotionDao.showPromotion(promotionId);
  console.log('service-showPromoQ');
  return data;
};
const isPreorderPass = async (eventId, performerId) => {
  const data = await promotionDao.isPreorderPass(eventId, performerId);
  console.log('service-showPromoQ');
  return data;
};

module.exports = {
  showPromotion,
  isPreorderPass,
};