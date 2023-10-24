const { ticketService } = require('../services');
const { throwError } = require('../utils');

const getTicketInfoByUserId = async (req, res, next) => {
  const { userId } = req.userData;
  try {
    const ticketInfo = await ticketService.getTicketInfo(userId);

    if (!ticketInfo || ticketInfo.length === 0) {
      throwError(400, 'NOT_FOUND_TICKETS');
    }

    res.status(200).json({
      message: 'GET_TICKETS',
      data : ticketInfo,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};  

module.exports = {
  getTicketInfoByUserId
};
