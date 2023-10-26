const express = require('express');

const router = express.Router();
const { getTicketInfoByUserId } = require('../controllers').ticketController;

router.get('/', getTicketInfoByUserId);

module.exports = router;
