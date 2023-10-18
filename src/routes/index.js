const express = require('express');
const router = express.Router();

const confirmationsRouter = require("./confirmationsRouter");

router.get('/', (req, res, next) => {
  res.send('OK');
});

router.use('/confirmations', confirmationsRouter);

module.exports = router;
