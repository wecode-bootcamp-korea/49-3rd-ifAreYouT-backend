const { orderService } = require('../services');
const { throwError } = require('../utils');

const { getSeatsDataService } = orderService;

const getSeatsController = async (req, res, next) => {
  try {
    const eventId = req.query;
    const seatsData = await getSeatsDataService(eventId);
    if (!seatsData) throwError(400, 'no seat data');
    res.status(200).json({
      data: seatsData,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  getSeatsController,
};
