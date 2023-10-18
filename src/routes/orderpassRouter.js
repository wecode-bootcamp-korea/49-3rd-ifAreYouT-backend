const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get("/order-pass/:userId", userController.orderPassController)

module.exports = router;