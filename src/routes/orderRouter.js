const express = require('express');
const { orderController } = require('../controllers');
const router = express.Router();

router.get("/details", orderController.getUserOrder)


module.exports = router;