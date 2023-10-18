const express = require('express');
const orderlistController = require('../controllers/orderlistController');
const router = express.Router();

router.get("/check-order/:userId", orderlistController.CheckOrderController)


module.exports = router;