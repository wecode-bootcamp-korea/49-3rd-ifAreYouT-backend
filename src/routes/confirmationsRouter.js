const express = require('express');
const confirmationsController = require('../controllers/confirmationsController');
const { verificateToken } = require('../middlewares');
const router = express.Router();

router.get('/', verificateToken, confirmationsController.userByLikeController);

module.exports = router;
