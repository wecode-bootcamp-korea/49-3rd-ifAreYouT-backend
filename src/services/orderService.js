const { isEmpty } = require('lodash');
const { seatStatusQueue } = require('../queue');
const { generateOrderNumber, throwError } = require('../utils');
const {
  getSeatsDataDao,
  isEventExistDao,
  updateEventSeatDao,
  isSeatReservableDao,
} = require('../models').orderDao;
const { orderDao } = require('../models');


const isEventExistService = async (eventId) => {
  const eventExist = await isEventExistDao(eventId);
  if (isEmpty(eventExist)) throwError(400, 'no event data');
};
const getSeatsDataService = (eventId) => {
  return getSeatsDataDao(eventId);
};
const updateEventSeatService = async (data) => {
  const { seats } = data;
  const orderNumber = generateOrderNumber();
  const isSeatReservable = await isSeatReservableDao(data);
  if (!isSeatReservable) throwError(400, 'seat already reserved');
  await seatStatusQueue.add({ seats, orderNumber }, { delay: 1000 * 60 * 10 });
  return updateEventSeatDao(data, orderNumber);
};

const getOrderByUserId = async (userId) => {
  const orderInfo = orderDao.getOrderByUserId(userId);
  return orderInfo;
};

module.exports = {
  getSeatsDataService,
  isEventExistService,
  updateEventSeatService,
  getOrderByUserId
};
