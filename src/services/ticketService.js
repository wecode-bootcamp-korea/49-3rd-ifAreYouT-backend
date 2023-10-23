const { ticketDao } = require('../models');
const { throwError } = require('../utils');

const getTicketInfo = async (userId) => {
  const ticketInfo = ticketDao.getTicketInfoByUserId(userId);
  if (ticketInfo.length === 0) {
    throwError(400, 'INVALID_ORDER');
  }
  return ticketInfo;
};

module.exports = {
  getTicketInfo
};
