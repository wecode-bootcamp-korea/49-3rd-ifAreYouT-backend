const express = require('express');
const confirmationsController = require('../controllers/confirmationsController');
const router = express.Router();

router.get('/', confirmationsController.userByLikeController);

module.exports = router;
