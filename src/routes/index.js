const express = require('express');
const router = express.Router();

const ticketRouter = require("./ticketRouter");
const preorderpassRouter = require("./preorderpassRouter")

router.get('/', (req, res, next) => {
  res.send('OK');
});

router.use('/tickets', ticketRouter);
router.use('/preorder-pass', preorderpassRouter)

module.exports = router;
