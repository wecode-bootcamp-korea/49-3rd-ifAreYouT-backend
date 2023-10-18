const express = require('express');
const router = express.Router();

const ticketRouter = require("./ticketRouter");

router.get('/', (req, res, next) => {
  res.send('OK');
});

router.use('/tickets', ticketRouter);

module.exports = router;
