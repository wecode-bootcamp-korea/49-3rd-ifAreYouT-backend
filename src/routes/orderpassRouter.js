const express = require('express');
const { orderpassController } = require('../controllers');
const { verificateToken } = require('../middlewares');
const router = express.Router();

router.get('/', orderpassController.CheckOrderController);

module.exports = router;
