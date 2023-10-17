const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get("/get-tickets/:userId", userController.userTicketsController)
router.get("/check-order/:userId", userController.CheckOrderController)


module.exports = router;