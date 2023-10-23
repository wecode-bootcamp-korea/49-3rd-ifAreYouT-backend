const express = require('express');
const { ticketController } = require('../controllers');
const router = express.Router();

router.get("/", ticketController.getTicketInfoByUserId)


module.exports = router;