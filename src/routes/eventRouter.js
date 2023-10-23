const express = require('express');
const { eventController } = require('../controllers');
const router = express.Router();

router.get('/likes', eventController.getLikedEventsByUser);

module.exports = router;
