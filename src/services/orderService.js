const { orderDao } = require('../models');
const { getSeatsDataDao, isEventExistDao } = orderDao;

const isEventExistService = (eventId) => {
  return isEventExistDao(eventId);
};
const getSeatsDataService = (eventId) => {
  return getSeatsDataDao(eventId);
};

module.exports = {
  getSeatsDataService,
  isEventExistService,
};
