const { getSeatsDataDao, isEventExistDao } = require('../models').orderDao;

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
