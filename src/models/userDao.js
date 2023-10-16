const { dataSource } = require('./dataSource');

const findByUserId = async (userId) => {
  const user = await dataSource.query(
    `
      SELECT
        id
      FROM
        users
      WHERE
        id = ?
      `,
    [userId],
  );

  return user[0];
};

const createUserinfo = async (email, nickname, phoneNumber, provider, uid) => {
  await dataSource.query(`
        INSERT INTO users (
            email,
            birth_date,
            nickname,
            phone_number,
            provider,
            uid
            ) VALUES (
              '${email}',
              null,
              '${nickname}',
              '${phoneNumber}',
              '${provider}',
              '${uid}'
            )`);
};

const updateUserinfo = async (email, nickname, phoneNumber, userId) => {
  await dataSource.query(
    `
    UPDATE users
    SET email = ?, nickname = ?, phone_number = ?
    WHERE id = ?;`,
    [email, nickname, phoneNumber, userId],
  );
};

const userGetTickets = async (userId, orderId) => {
  const user = await dataSource.query(
    `
    SELECT 
      user_id,
      order_id
    FROM event_orders
    WHERE user_id = ? AND order_id = ?;`,
    [userId, orderId],
  );
  return user;
};

const userCheckOrder = async (userId) => {
  const user = await dataSource.query(
    `
   SELECT
   o.id AS orderId,
   u.email AS userEmail,
   e.title AS eventName,
   eo.order_name AS orderName,
   eo.ticket_code AS ticketCode
 FROM
   orders o
 JOIN
   users u ON o.user_id = u.id
 JOIN
   event_orders eo ON eo.order_id = o.id
 JOIN
   events e ON eo.event_id = e.id
 WHERE
   u.id = ?;
    `,
    [userId],
  );
  return user;
};

const userLike = async (userId, eventId) => {
  const user = await dataSource.query(
    `
    SELECT 
    user_id, event_id
    FROM event_reactions
    WHERE user_id = ? AND event_id = ?
    LIMIT 1;`,
    [userId, eventId],
  );
  return user;
};

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
  findByUserId,
  createUserinfo,
  updateUserinfo,
  userGetTickets,
  userCheckOrder,
  userLike,
  userOrderPass,
};
