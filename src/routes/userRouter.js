const express = require('express');
const { userController } = require('../controllers');
const router = express.Router();

router.post("/", userController.addCreateUser)
router.put("/", userController.updateUser)


module.exports = router;