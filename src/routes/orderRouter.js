const express = require('express');

const router = express.Router();
const { getSeatsController, updateEventSeatsController } =
  require('../controllers').orderController;
router.get('/seats', getSeatsController);
router.patch('/seats', updateEventSeatsController);

module.exports = router;
