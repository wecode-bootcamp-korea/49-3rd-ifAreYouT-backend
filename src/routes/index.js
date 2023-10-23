const express = require('express');
const router = express.Router();
const { verificateToken } = require('../middlewares');

const ticketRouter = require('./ticketRouter');
const eventRouter = require('./eventRouter');

router.get('/', (req, res, next) => {
  res.send('OK');
});

router.use('/tickets', ticketRouter);
router.use('/events', verificateToken, eventRouter);

module.exports = router;
