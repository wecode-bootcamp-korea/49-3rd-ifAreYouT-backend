const { eventService } = require('../services');
const { verifyToken } = require('../utils');

const viewByCategory = async (req, res) => {
  const { category = 'ballad', sort, page, size } = req.query;
  const offset = size * (page - 1);
  const result = await eventService.viewByCategory(category, sort, offset, page, size);
  res.status(200).json({ data: result[0] });
};

const viewEvent = async (req, res) => {
  const userId = req.userData;
  const { id } = req.params;
  const result = await eventService.viewEvent(userId, id);
  res.status(200).json({ data: result[0] });
};

const viewBySearch = async (req, res) => {
  const { keyword, page, size } = req.query;
  const offset = size * (page - 1);
  const result = await eventService.viewBySearch(keyword, offset, page, size);
  res.status(200).json({ data: result[0] });
};
// 리엑션은 한번 하면 수정안됨 삭제안됨 중복안됨
const updateReaction = async (req, res) => {
  const { eventId, reaction } = req.body;
  const userId = req.userData;

  await eventService.updateReaction(eventId, userId, reaction);
  res.status(200).json({ message: 'add success' });
};

const viewMain = async (req, res) => {
  const result = await eventService.viewMain();
  res.status(200).json({ data: result });
};

const checkAccess = async (req, res) => {
  const userId = req.userData;
  const eventId = req.params.id;
  await eventService.checkAccess(userId, eventId);

  res.status(209).json({ message: 'access granted' });
};

const viewNaverMap = async (req, res) => {
  const stageId = req.params.id;
  const result = await eventService.viewNaverMap(stageId);
  res.status(200).json({ data: result });
};

module.exports = {
  viewEvent,
  viewBySearch,
  updateReaction,
  viewByCategory,
  viewMain,
  checkAccess,
  viewNaverMap,
};
