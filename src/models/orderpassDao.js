const { dataSource } = require('./dataSource');

const userOrderPass = async (userId) => {
    const user = await dataSource.query(
      `
      SELECT COUNT(*) AS count
      FROM Preorder_passes
      WHERE user_id = ?;`,
      [userId],
    );
  
    const hasOrderPass = user[0].count > 0;
    return hasOrderPass;
  };

module.exports = {
  userOrderPass,
};