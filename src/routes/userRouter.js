const express = require('express');
const { userController } = require('../controllers');
const { verificateToken } = require('../middlewares')
const router = express.Router();

router.post("/", verificateToken, userController.createUserController)
router.put("/", verificateToken, userController.updateUserController)


module.exports = router;