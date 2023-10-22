const { dataSource } = require('./dataSource');

const getUserPreorderPassByUserId = async (userId, preorderPassesId) => {
  const user = await dataSource.query(
    `
    SELECT
      COUNT(*) AS has_preorder_pass
    FROM users AS u
    INNER JOIN preorder_passes AS pp ON pp.user_id = u.id
    WHERE u.id = ? AND pp.id = ?
    `,
    [userId, preorderPassesId],
  );

  const hasPreorderPass = user[0].has_preorder_pass > 0 ? 1 : 0;

  return hasPreorderPass;
};

module.exports = {
  getUserPreorderPassByUserId,
};
