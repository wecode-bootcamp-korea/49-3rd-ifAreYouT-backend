const express = require('express');
const { promotionController } = require('../controllers');
const { verificateToken } = require('../middlewares');
const promotionRouter = express.Router();

promotionRouter.get('/:promotionId', promotionController.getQuestionsByPromoId);
promotionRouter.post(
  '/:promotionId',
  verificateToken,
  promotionController.putPreorderPass,
);

module.exports = promotionRouter;
