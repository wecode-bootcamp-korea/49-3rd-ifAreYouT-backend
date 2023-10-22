const express = require('express');
const { eventController } = require('../controllers');
const { verificateToken } = require('../middlewares');
const { asyncWrap } = require('../utils');
const eventRouter = express.Router();

eventRouter.get('/', asyncWrap(eventController.viewByCategory));
eventRouter.get('/search', asyncWrap(eventController.viewBySearch));
eventRouter.get('/main', asyncWrap(eventController.viewMain));
eventRouter.get('/:id', verificateToken, asyncWrap(eventController.viewEvent));
eventRouter.put('/reaction', verificateToken, asyncWrap(eventController.updateReaction));
eventRouter.get(
  '/passcheck/:id',
  verificateToken,
  asyncWrap(eventController.checkAccess),
);
eventRouter.get('/map/:id', asyncWrap(eventController.viewNaverMap));

module.exports = { eventRouter };
