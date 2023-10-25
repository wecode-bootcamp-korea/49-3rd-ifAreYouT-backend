const { isEmpty } = require('lodash');
const { throwError } = require('../utils');

const { getSeatsDataDao, isEventExistDao } = require('../models').orderDao;

const isEventExistService = async (eventId) => {
  const eventExist = await isEventExistDao(eventId);
  if (isEmpty(eventExist)) throwError(400, 'no event data');
};
const getSeatsDataService = (eventId) => {
  return getSeatsDataDao(eventId);
};

module.exports = {
  getSeatsDataService,
  isEventExistService,
};
