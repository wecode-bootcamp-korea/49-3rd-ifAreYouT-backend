const express = require('express');
const ticketController = require('../controllers/ticketController');
const { verificateToken } = require('../middlewares')
const router = express.Router();

router.get("/likes", verificateToken, ticketController.getTicketInfoByUserId)


module.exports = router;