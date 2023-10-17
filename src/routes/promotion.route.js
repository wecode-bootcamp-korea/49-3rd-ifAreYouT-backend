const express = require('express');
const { promotionController } = require('../controllers');
const promotionRouter = express.Router();

promotionRouter.get('/promotion/:eventId', promotionController.showPromotion);
promotionRouter.get('/promotion/:eventId', promotionController.isPreorderPass);

module.exports = promotionRouter;
