const { isEmpty } = require('lodash');
const { throwError, isAllDataHasValue } = require('../utils');
const { getSeatsDataService, isEventExistService, updateEventSeatService } =
  require('../services').orderService;
const { orderService } = require('../services');

const getSeatsController = async (req, res, next) => {
  try {
    const { eventId } = req.query;
    if (!eventId)
      throwError(400, 'required query parameter eventId is missing');
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
    if (!eventId)
      throwError(400, 'required query parameter eventId is missing');
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

const getUserOrder = async (req, res, next) => {
  const { userId } = req.userData.data;
  try {
    const orderInfo = await orderService.getOrderByUserId(userId);

    if (!orderInfo || orderInfo.length === 0) {
      throwError(400, 'NOT_FOUND_ORDER');
    }
    return res.status(200).json({
      message: 'GET_ORDER',
      data: orderInfo,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getSeatsController,
  updateEventSeatsController,
  getUserOrder,
};
