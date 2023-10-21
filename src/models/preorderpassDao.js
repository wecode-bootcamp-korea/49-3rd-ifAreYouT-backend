const { dataSource } = require('./dataSource');

const getUserPreorderPassByUserId = async (userId, preorderPassesId) => {
  const user = await dataSource.query(
    `
    SELECT
      u.id AS user_id,
      p.id AS promotion_id,
      pp.id AS preorder_passes_id,
      e.id AS event_id
    FROM users AS u
    INNER JOIN preorder_passes AS pp ON pp.user_id = u.id
    INNER JOIN events AS e ON e.id = pp.event_id
    INNER JOIN promotions AS p ON p.id = e.promotion_id
    WHERE u.id = ? AND pp.id = ?
    `,
    [userId, preorderPassesId],
  );
  return user;
};

module.exports = {
  getUserPreorderPassByUserId,
};
