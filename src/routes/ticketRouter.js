const express = require('express');
const ticketController = require('../controllers/ticketController');
const router = express.Router();

router.get("/get-tickets", ticketController.getTicketInfoByUserId)


module.exports = router;