const { getSeatsDataService, isEventExistService } = require('./orderService');
const ticketService = require('./ticketService');

module.exports = {
  orderService: {
    getSeatsDataService,
    isEventExistService,
  },
  ticketService,
};
