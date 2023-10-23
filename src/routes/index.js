const express = require('express');
const router = express.Router();
const { eventRouter } = require('./eventRoute');

const ticketRouter = require('./ticketRouter');

router.get('/', (req, res, next) => {
  res.send('OK');
});
router.use('/events', eventRouter);
router.use('/tickets', ticketRouter);

module.exports = router;
