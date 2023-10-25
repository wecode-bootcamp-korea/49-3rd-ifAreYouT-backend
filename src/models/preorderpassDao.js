const { log } = require('console');
const { dataSource } = require('./dataSource');

const getUserPreorderPassByUserId = async (userId) => {
  const user = await dataSource.query(
    `
    SELECT
      e.title AS eventTitle
    FROM users AS u
    INNER JOIN preorder_passes AS pp ON pp.user_id = u.id
    INNER JOIN events AS e ON pp.event_id = e.id
    WHERE u.id = ?;
    `,
    [userId],
  );

  return user;
};

module.exports = {
  getUserPreorderPassByUserId,
};
