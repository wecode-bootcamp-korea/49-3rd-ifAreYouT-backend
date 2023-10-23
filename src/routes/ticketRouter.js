const express = require('express');
const { ticketController } = require('../controllers');
const { verificateToken } = require('../middlewares')
const router = express.Router();

router.get("/", ticketController.getTicketInfoByUserId)


module.exports = router;