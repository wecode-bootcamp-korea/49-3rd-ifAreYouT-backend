const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get("/get-tickets/:userId", userController.userTicketsController)
router.get("/check-order/:userId", userController.CheckOrderController)
router.get("/like-users/:userId", userController.userByLikeController)


module.exports = router;