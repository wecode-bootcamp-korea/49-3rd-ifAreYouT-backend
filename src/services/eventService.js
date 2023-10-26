const { eventDao, queryBuilder } = require('../models');
const { throwError } = require('../utils');

const viewByCategory = async (category, sort, offset, page, size) => {
  if (page < 1) {
    throwError(400, 'Non available page');
  }
  const orderByQuery = await queryBuilder.orderBy(sort);
  const pageQuery = await queryBuilder.page(offset, size);

  const dataA = await eventDao.totalCountByCategory(category);
  const dataB = await eventDao.viewByCategory(
    category,
    orderByQuery,
    pageQuery,
  );
  dataA[0].list = dataB;
  return dataA;
};

const viewEvent = async (userId, id) => {
  const dataA = await eventDao.eventDetail(id);
  const dataB = await eventDao.remainingSeats(id);
  const dataC = await eventDao.reactions(id);
  const dataD = await eventDao.participatedOrNot(userId, id);
  dataA[0].seats = dataB;
  dataA[0].reactions = dataC;
  dataA[0].participate = dataD;
  return dataA;
};

const viewBySearch = async (keyword, offset, page, size) => {
  if (page < 1) {
    throwError(400, 'Non available page');
  }
  const pageQuery = await queryBuilder.page(offset, size);
  const dataA = await eventDao.totalCountBySearch(keyword);
  const dataB = await eventDao.viewBySearch(keyword, pageQuery);
  dataA[0].list = dataB;
  return dataA;
};

const updateReaction = async (eventId, userId, reaction) => {
  if (reaction !== 'exited' && reaction !== 'unexited') {
    throwError(400, 'keyerror');
  }
  const data = await eventDao.checkParticipation(eventId, userId, reaction);
  if (data.length) {
    throwError(410, 'already participated');
  }
  if (!data.length) {
    await eventDao.updateReaction(eventId, userId, reaction);
  }
};

const viewMain = async () => {
  const dataA = await eventDao.viewEventsMain();
  const dataB = await eventDao.viewPromotionsMain();
  const wrapper = {};
  wrapper.events = dataA;
  wrapper.promotions = dataB;

  return wrapper;
};

const checkAccess = async (userId, eventId) => {
  const data = await eventDao.checkPass(userId, eventId);
  if (!data.length) {
    throwError(409, 'user without preorderpass');
  }
  return data;
};

const viewNaverMap = async (stageId) => {
  const data = await eventDao.getCoordinate(stageId);
  if (!data.length) {
    throwError(400, 'keyerror');
  }
  return data;
};

module.exports = {
  viewByCategory,
  viewEvent,
  viewBySearch,
  updateReaction,
  viewMain,
  checkAccess,
  viewNaverMap,
};
