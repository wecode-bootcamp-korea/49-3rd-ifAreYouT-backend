const { dataSource } = require('./dataSource');

const getTicketInfoByUserId = async (userId) => {
  const user = await dataSource.query(
    ` 
    SELECT 
    eo.ticket_code AS ticketCode, 
    e.title AS eventName, 
    s.row_name AS rowName, 
    s.col_name AS colName, 
    sg.price AS ticketPrice
   FROM event_orders eo
   JOIN orders o ON eo.order_id = o.id
   JOIN times t ON eo.time_id = t.id
   JOIN events e ON t.event_id = e.id
   JOIN seats s ON eo.seat_id = s.id
   JOIN seat_grades sg ON s.grade_id = sg.id
   WHERE o.user_id = ?;`,
    [userId],
  );
  return user
};

module.exports = {
  getTicketInfoByUserId
};
