const express = require('express');
const router = express.Router();

const userRouter = require("./userRouter");

router.get('/', (req, res, next) => {
  res.send('OK');
});
router.use('/mypage', userRouter);

module.exports =  router;
