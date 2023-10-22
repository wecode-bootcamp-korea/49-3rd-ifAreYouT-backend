const { getSeatsDataDao, isEventExistDao, updateEventSeatDao } =
  require('../models').orderDao;

const isEventExistService = (eventId) => {
  return isEventExistDao(eventId);
};
const getSeatsDataService = (eventId) => {
  return getSeatsDataDao(eventId);
};
const updateEventSeatService = (datas) => {
  return updateEventSeatDao(datas);
};

module.exports = {
  getSeatsDataService,
  isEventExistService,
  updateEventSeatService,
};
