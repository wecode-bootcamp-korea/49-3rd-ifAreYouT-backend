const { dataSource } = require('./dataSource');

const getOrderByUserId = async (userId) => {
  const user = await dataSource.query(
    `
    SELECT
      o.id AS order_id,
      o.order_no AS orderNo,
      o.order_status AS orderStatus,
      e.title AS eventName,
      t.event_time AS eventTime,
      CONCAT(s.row_name, s.col_name) AS seat,
      sg.price AS ticketPrice,
      c.category_name AS categoryName,
      p.name AS performerName,
      pm.method AS paymentMethod,
      pmt.amount AS paymentAmount
    FROM orders AS o
    INNER JOIN event_orders AS eo ON o.id = eo.order_id
    INNER JOIN events AS e ON eo.time_id = e.id  
    INNER JOIN times AS t ON eo.time_id = t.id
    INNER JOIN seats AS s ON eo.seat_id = s.id
    INNER JOIN seat_grades AS sg ON s.grade_id = sg.id
    INNER JOIN categories AS c ON e.category_id = c.id
    INNER JOIN performers AS p ON e.performer_id = p.id
    INNER JOIN payments AS pmt ON o.id = pmt.order_id
    INNER JOIN payment_methods AS pm ON pmt.method_id = pm.id
    WHERE o.user_id = ?;
    `,
    [userId],
  );
  return user;
};

module.exports = {
  getOrderByUserId,
};
