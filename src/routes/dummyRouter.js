const express = require('express');
const router = express.Router();

router.get('/add_seats', async (_, res) => {
  res.json({
    message: 'seat created',
  });
});
router.get('/add_event_seats', async (_, res) => {
  res.json({
    message: 'seat created',
  });
});

module.exports = router;
