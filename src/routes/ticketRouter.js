const express = require('express');
const ticketController = require('../controllers/ticketController');
const { verificateToken } = require('../middlewares')
const router = express.Router();

router.get("/get-tickets", verificateToken, ticketController.getTicketInfoByUserId)


module.exports = router;