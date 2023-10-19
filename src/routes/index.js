const express = require('express');
const router = express.Router();

const eventRouter = require('./eventRouter');

router.get('/', (req, res, next) => {
  res.send('OK');
});

router.use('/events', eventRouter);

module.exports = router;
