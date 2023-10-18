const express = require('express');
const router = express.Router();
const { orderController } = require('../controllers');
const { getSeatsController } = orderController;

router.use('/seats', getSeatsController);

module.exports = router;
