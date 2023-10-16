const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post("/", userController.createUserController)
router.put("/", userController.updateUserController)
router.get("/get-tickets/:userId/:orderId", userController.userTicketsController)
router.get("/check-order/:userId", userController.CheckOrderController)
router.get("/like-users/:userId/:eventId", userController.userByLikeController)
router.get("/order-pass/:userId", userController.orderPassController)


module.exports = router;