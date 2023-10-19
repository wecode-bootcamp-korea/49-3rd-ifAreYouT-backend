const { getSeatsController } = require('./orderController');
const ticketController = require('./ticketController');

module.exports = {
  orderController: {
    getSeatsController,
  },
  ticketController,
};
