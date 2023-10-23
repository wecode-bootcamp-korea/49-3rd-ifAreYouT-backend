const { dataSource } = require('./dataSource');

const createUserinfo = async (email, nickname, phoneNumber, provider, uid) => {
  const adduser = await dataSource.query(
    `
    INSERT INTO users (
        email,
        birth_date,
        nickname,
        phone_number,
        provider,
        uid
    ) VALUES (?, null, ?, ?, ?, ?);
    `,
    [email, nickname, phoneNumber, provider, uid]
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
  createUserinfo,
  updateUserinfo,
};
