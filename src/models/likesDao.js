const { dataSource } = require('./dataSource');

const getLikedEventsByUserId = async (userId, reactionType) => {
    const likesInfo = await dataSource.query(
      `
    SELECT
      e.id AS event_id,
      e.title AS eventName,
      e.start_date AS eventDate,
      p.name AS performer,
      c.category_name AS category
    FROM events AS e
    JOIN event_reactions AS er ON e.id = er.event_id
    JOIN performers AS p ON e.performer_id = p.id
    JOIN categories AS c ON e.category_id = c.id
    WHERE er.user_id = ? AND er.reaction_type = ?;
    `,
      [userId, reactionType],
    );
    console.log(likesInfo);
    return likesInfo;
  };
  
  module.exports = {
    getLikedEventsByUserId,
  };
  