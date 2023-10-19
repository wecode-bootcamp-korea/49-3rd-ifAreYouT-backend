const { getSeatsDataDao, isEventExistDao } = require('./orderDao');
const dummyDao = require('./dummyDao');
const ticketDao = require('./ticketDao');

module.exports = {
  orderDao: {
    getSeatsDataDao,
    isEventExistDao,
  },
  dummyDao,
  ticketDao,
};
