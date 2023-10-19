const { isEmpty } = require('lodash');
const { orderService } = require('../services');
const { throwError, isEmptyData } = require('../utils');

const { getSeatsDataService, isEventExistService } = orderService;

const getSeatsController = async (req, res, next) => {
  try {
    const { eventId } = req.query;
    if (!eventId)
      throwError(400, 'required query parameter eventId is missing');
    const eventExist = await isEventExistService(eventId);
    if (isEmpty(eventExist)) throwError(400, 'no event data');
    const seatsData = await getSeatsDataService(eventId);
    console.log(seatsData);
    if (isEmptyData(seatsData)) throwError(400, 'no seat data');
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
