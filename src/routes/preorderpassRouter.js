const express = require('express');
const { preorderpassController } = require('../controllers');
const { verificateToken } = require('../middlewares');
const router = express.Router();

router.get("/", verificateToken, preorderpassController.getUserPreorderPassByUserId);

module.exports = router;
