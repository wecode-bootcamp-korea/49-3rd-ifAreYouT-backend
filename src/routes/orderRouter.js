const express = require('express');

const router = express.Router();
const { getSeatsController, updateEventSeatsController, getUserOrder } =
  require('../controllers').orderController;

router.get('/seats', getSeatsController);
router.patch('/seats', updateEventSeatsController);
router.get("/details", getUserOrder);

module.exports = router;
