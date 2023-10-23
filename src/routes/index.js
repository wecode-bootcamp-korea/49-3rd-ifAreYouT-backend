const express = require('express');
const router = express.Router();

const {authRouter} = require('./authRoute')
const ticketRouter = require("./ticketRouter");


router.get('/', (req, res, next) => {
  res.send('OK');
});

router.use('/tickets', ticketRouter);
router.use('/auth', authRouter)

module.exports = router;
