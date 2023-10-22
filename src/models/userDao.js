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

const createUserinfo = async (email, birthDate, nickname, phoneNumber, provider, uid) => {
  const adduser = await dataSource.query(
    `
    INSERT INTO users (
        email,
        birth_date,
        nickname,
        phone_number,
        provider,
        uid
    ) VALUES (?, ?, ?, ?, ?, ?);
    `,
    [email, birthDate, nickname, phoneNumber, provider, uid]
  );
  return adduser;
};

const updateUserinfo = async (email, birthDate, nickname, phoneNumber, userId) => {
  await dataSource.query(
    `
      UPDATE 
        users
      SET 
        email = ?, 
        birth_date = ?, 
        nickname = ?, 
        phone_number = ?
      WHERE id = ? ;
      `,
    [email, birthDate, nickname, phoneNumber, userId],
  );
};

module.exports = {
  findByUserId,
  createUserinfo,
  updateUserinfo,
};
