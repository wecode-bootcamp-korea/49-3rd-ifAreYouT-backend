const express = require('express');
const router = express.Router();
const { verificateToken } = require('../middlewares');

const ticketRouter = require("./ticketRouter");

router.get('/', (req, res, next) => {
  res.send('OK');
});

router.use('/tickets', verificateToken, ticketRouter);

module.exports = router;
