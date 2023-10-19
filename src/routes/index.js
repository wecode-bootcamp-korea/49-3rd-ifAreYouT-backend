const express = require('express');
const router = express.Router();

const ticketRouter = require("./ticketRouter");
const orderpassRouter = require("./orderpassRouter")

router.get('/', (req, res, next) => {
  res.send('OK');
});

router.use('/tickets', ticketRouter);
router.use('/preorder-pass', orderpassRouter)

module.exports = router;
