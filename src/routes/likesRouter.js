const express = require('express');
const { likesController } = require('../controllers');
const router = express.Router();

router.get('/', likesController.getLikedEventsByUser);

module.exports = router;