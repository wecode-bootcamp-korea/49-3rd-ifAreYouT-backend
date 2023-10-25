const { updateSeatStatusDao, getOrderNumberBySeatIdDao } =
  require('../models').orderDao;

module.exports = async (job) => {
  const { seats } = job.data;
  const orderNumber = await getOrderNumberBySeatIdDao(seats);
  await updateSeatStatusDao(seats, orderNumber[0].order_number);
};
