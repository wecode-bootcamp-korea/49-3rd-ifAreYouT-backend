const express = require('express');
const router = express.Router();
const { verificateToken } = require('../middlewares');

const ticketRouter = require("./ticketRouter");
const orderRouter = require("./orderRouter");

router.get('/', (req, res, next) => {
  res.send('OK');
});

router.use('/tickets', ticketRouter);
router.use('/orders', verificateToken, orderRouter);


module.exports = router;
