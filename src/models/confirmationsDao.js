const { dataSource } = require('./dataSource');

const getUserLikeById = async (userId) => {
  const user = await dataSource.query(
    `
    SELECT events.*
      FROM events
      INNER JOIN event_reactions ON events.id = event_reactions.event_id
      WHERE event_reactions.user_id = ? AND event_reactions.reaction_type = 'exited';`,
    [userId],
  );
  return user;
};

module.exports = {
  getUserLikeById,
};
