const { orderDao } = require('../models');
const { getSeatsDataDao } = orderDao;

const getSeatsDataService = (eventId) => {
  return getSeatsDataDao(eventId);
};

module.exports = {
  getSeatsDataService,
};
