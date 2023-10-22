const express = require('express');
const { preorderpassController } = require('../controllers');
const router = express.Router();

router.get("/", preorderpassController.getUserPreorderPassByUserId);

module.exports = router;
