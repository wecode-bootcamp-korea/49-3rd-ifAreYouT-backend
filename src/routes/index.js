const express = require('express');
const router = express.Router();

const { kakaoLoginRouter } = require('./kakaoLoginRoute')
const { naverLoginRouter } = require('./naverLoginRoute');
const ticketRouter = require("./ticketRouter");


router.get('/', (req, res, next) => {
  res.send('OK');
});

router.use('/tickets', ticketRouter);
router.use('/auth', kakaoLoginRouter);
router.use('/auth', naverLoginRouter);

module.exports = router;
