const express = require('express');
const router = express.Router();

const orderRouter = require("./orderRouter");

router.get('/', (req, res, next) => {
  res.send('OK');
});

router.use('/orders', orderRouter);

module.exports = router;
