const express = require('express');
const router = express.Router();
const { verificateToken } = require('../middlewares');

const ticketRouter = require("./ticketRouter");
const preorderpassRouter = require("./preorderpassRouter")

router.get('/', (req, res, next) => {
  res.send('OK');
});

router.use('/tickets', verificateToken, ticketRouter);
router.use('/preorder-pass', verificateToken, preorderpassRouter)

module.exports = router;
