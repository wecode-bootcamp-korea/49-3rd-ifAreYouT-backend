const express = require('express');
const router = express.Router();
const { verificateToken } = require('../middlewares');

const ticketRouter = require("./ticketRouter");
const userRouter = require("./userRouter")

router.get('/', (req, res, next) => {
  res.send('OK');
});

router.use('/tickets', ticketRouter);
router.use('/users',  verificateToken, userRouter);

module.exports = router;
