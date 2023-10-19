const { getSeatsDataDao, isEventExistDao } = require('./orderDao');
const { addSeatsDao, addEventSeatsDao } = require('./dummyDao');

module.exports = {
  getSeatsDataDao,
  isEventExistDao,
  addSeatsDao,
  addEventSeatsDao,
};
