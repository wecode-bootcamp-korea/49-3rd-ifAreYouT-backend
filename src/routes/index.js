const express = require('express');
const router = express.Router();
const ticketRouter = require("./ticketRouter");
const orderRouter = require("./orderRouter");

router.get('/', (req, res, next) => {
  res.send('OK');
});

router.use('/tickets', ticketRouter);
router.use('/orders', orderRouter);


module.exports = router;
