const express = require('express');
const router = express.Router();

router.get('/payment', () => {
  res.send('OK');
});

module.exports = router;
