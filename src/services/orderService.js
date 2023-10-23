const { seatStatusQueue } = require('../queue');
const { generateOrderNumber, throwError } = require('../utils');

const {
  getSeatsDataDao,
  isEventExistDao,
  updateEventSeatDao,
  isSeatReservableDao,
} = require('../models').orderDao;

const isEventExistService = (eventId) => {
  return isEventExistDao(eventId);
};
const getSeatsDataService = (eventId) => {
  return getSeatsDataDao(eventId);
};
const updateEventSeatService = async (data) => {
  const { seats } = data;
  const orderNumber = generateOrderNumber();
  const isSeatReservable = await isSeatReservableDao(data);
  if (!isSeatReservable) throwError(400, 'seat already reserved');
  await seatStatusQueue.add({ seats, orderNumber }, { delay: 1000 * 60 * 1 });
  return updateEventSeatDao(data, orderNumber);
};

module.exports = {
  getSeatsDataService,
  isEventExistService,
  updateEventSeatService,
};
