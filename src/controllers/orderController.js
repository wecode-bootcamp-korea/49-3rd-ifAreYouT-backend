const { isEmpty } = require('lodash');
const { throwError, isAllDataHasValue } = require('../utils');
const { getSeatsDataService, isEventExistService, updateEventSeatService } =
  require('../services').orderService;

const getSeatsController = async (req, res, next) => {
  try {
    const { eventId } = req.query;
    if (!eventId) throwError(400, 'required query parameter eventId is missing');
    await isEventExistService(eventId);
    const seatsData = await getSeatsDataService(eventId);
    res.status(200).json({
      data: seatsData,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateEventSeatsController = async (req, res, next) => {
  try {
    const { userId } = req.userData;
    const { eventId } = req.query;
    const { seats } = req.body;
    if (!eventId) throwError(400, 'required query parameter eventId is missing');
    await isEventExistService(eventId);
    if (!seats || !isAllDataHasValue(seats)) throwError(400, 'key error');
    const result = await updateEventSeatService({ ...req.body, userId: 1 });
    if (!result) throwError(400, 'seat update failed');
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  getSeatsController,
  updateEventSeatsController,
};
