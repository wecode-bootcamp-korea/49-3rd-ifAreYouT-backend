const { ticketService } = require('../services');
const { throwError } = require('../utils');
const { v4: uuidv4 } = require('uuid');

const getTicketInfoByUserId = async (req, res) => {
  const userId = req.userData
  try {
    const ticketInfo = await ticketService.getTicketInfo(userId);

    if (!ticketInfo) {
      throwError(400, 'NOT_FOUND_ORDER');
    }

    res.status(200).json({
      message: 'GET_TICKETS',
      data: ticketInfo,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = {
  getTicketInfoByUserId
};