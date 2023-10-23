const express = require('express');
const { promotionController } = require('../controllers');
const promotionRouter = express.Router();

// promotionRouter.get("/",(req,res)=>{
//     res.send("promotion");
// });
promotionRouter.get('/:promotionId', promotionController.getQuestionsByPromoId);
promotionRouter.post('/:promotionId', promotionController.putPreorderPass);

module.exports = promotionRouter;
