const { ticketService } = require('../services');
const { throwError } = require('../utils');

const getTicketInfoByUserId = async (req, res, next) => {
  const { userId } = req.userData;
  try {
    const ticketInfo = await ticketService.getTicketInfo(userId);

    if (!ticketInfo) {
      throwError(400, 'NOT_FOUND_ORDER');
    }

    res.status(200).json({
      message: 'GET_TICKETS',
      data: ticketInfo,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  getTicketInfoByUserId,
};
