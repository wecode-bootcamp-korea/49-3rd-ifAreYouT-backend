const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get("/get-tickets/:userId", userController.userTicketsController)


module.exports = router;