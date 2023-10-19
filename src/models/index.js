const { getSeatsDataDao, isEventExistDao } = require('./orderDao');
const dummyDao = require('./dummyDao');

module.exports = {
  orderDao: {
    getSeatsDataDao,
    isEventExistDao,
  },
  dummyDao,
};
