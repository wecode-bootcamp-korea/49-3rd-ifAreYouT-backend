const express = require('express');
const router = express.Router();
const { getSeatsController } = require('../controllers').orderController;

router.use('/seats', getSeatsController);

module.exports = router;
