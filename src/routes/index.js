const express = require('express');
const router = express.Router();

<<<<<<< HEAD
const orderRouter = require("./orderRouter");
=======
const ticketRouter = require("./ticketRouter");
>>>>>>> main

router.get('/', (req, res, next) => {
  res.send('OK');
});

<<<<<<< HEAD
router.use('/orders', orderRouter);
=======
router.use('/tickets', ticketRouter);
>>>>>>> main

module.exports = router;
