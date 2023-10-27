const express = require('express');

const router = express.Router();
const { getTicketInfoByUserId } = require('../controllers').ticketController;

router.get("/", verificateToken, ticketController.getTicketInfoByUserId)

module.exports = router;
