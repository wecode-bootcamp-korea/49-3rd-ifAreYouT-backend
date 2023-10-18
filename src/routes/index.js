const express = require('express');
const router = express.Router();

const orderlistRouter = require("./orderlistRouter");

router.get('/', (req, res, next) => {
  res.send('OK');
});

router.use('/orderlists', orderlistRouter);

module.exports = router;
