const { isEmpty } = require('lodash');
const { orderService } = require('../services');
const { throwError } = require('../utils');

const { getSeatsDataService, isEventExistService } = orderService;

const getSeatsController = async (req, res, next) => {
  try {
    const { eventId } = req.query;
    if (!eventId)
      throwError(400, 'required query parameter eventId is missing');
    const eventExist = await isEventExistService(eventId);
    if (isEmpty(eventExist)) throwError(400, 'no event data');
    const seatsData = await getSeatsDataService(eventId);
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
