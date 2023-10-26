const { ticketDao } = require('../models');

const getTicketInfo = async (userId) => {
  const ticketInfo = ticketDao.getTicketInfoByUserId(userId);
  return ticketInfo;
};

module.exports = {
  getTicketInfo
};
