const express = require('express');
const { promotionController } = require('../controllers');
const promotionRouter = express.Router();

promotionRouter.get("/",(req,res)=>{
    res.send("promotion");
});
promotionRouter.get('/:eventId', promotionController.showPromotion);
//promotionRouter.get('/promotion/:eventId', promotionController.isPreorderPass);

module.exports = promotionRouter;
