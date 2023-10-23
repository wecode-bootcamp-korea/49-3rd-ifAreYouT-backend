const { updateSeatStatusDao } = require('../models').orderDao;

module.exports = async (job) => {
  const { seats } = job.data;
  await updateSeatStatusDao(seats);
};
