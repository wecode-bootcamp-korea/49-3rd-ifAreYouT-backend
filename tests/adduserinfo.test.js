const request = require('supertest');
const { createApp } = require('../app');
const { dataSource } = require('../src/models/dataSource');
const jwt = require('jsonwebtoken');

describe('adduser created info', () => {
  let app;
  let accessToken;

  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
    await dataSource.query(`
    INSERT INTO users 
      (id, email, nickname, phone_number, provider, uid)
    VALUES 
      (1, 'wecode13@gmil.com', 'testUser', '010-1234-5678', 'kakao', '1');
    `);

    const userResult = await dataSource.query(
      'SELECT id FROM users WHERE id = ?',
      [1],
    );
    const userId = userResult[0].id;
    accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  });

  afterAll(async () => {
    await dataSource.query(`SET foreign_key_checks = 0;`);
    await dataSource.query(`TRUNCATE users`);
    await dataSource.query(`SET foreign_key_checks = 1;`);
    await dataSource.destroy();
  }, 10000);

  test('FALIED : failed created user', async () => {
    const newUserData = {
      email: '12211',
      nickname: 'testUser',
      provider: 'kakao',
      uid: '2'
    };

    const res = await request(app)
      .post(`/addusers`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(newUserData);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual('KEY_ERROR');
  });

  test('SUCCESS: add created user', async () => {
    const newUserData = {
      email: 'wecode13@gmil.com',
      nickname: 'testUser',
      phone_number: '010-1234-5678',
      provider: 'kakao',
      uid: '2'
    };

    const res = await request(app)
      .post(`/addusers`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(newUserData);
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('SUCCESS');
  });
});

describe('updateuser info', () => {
  let app;
  let accessToken;

  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
    await dataSource.query(`
      INSERT INTO users 
        (id, email, nickname, phone_number, provider, uid)
      VALUES 
        (1, 'wecode13@gmil.com', 'testUser', '010-1234-5678', 'kakao', '1');
      `);

    const userResult = await dataSource.query(
      'SELECT id FROM users WHERE id = ?',
      [1],
    );
    const userId = userResult[0].id;
    accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  });

  afterAll(async () => {
    await dataSource.query(`SET foreign_key_checks = 0;`);
    await dataSource.query(`TRUNCATE users`);
    await dataSource.query(`SET foreign_key_checks = 1;`);
    await dataSource.destroy();
  }, 10000);

  test('FALIED : failed updated user', async () => {
    const updatedUserData = {
      email: '12211',
      nickname: 'testUser',
      provider: 'kakao',
      uid: '2'
    };

    const res = await request(app)
      .put(`/addusers`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updatedUserData);
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual('KEY_ERROR');
  });

  test('SUCCESS: update user info', async () => {
    const updatedUserData = {
      email: 'wecode13@gmil.com',
      nickname: 'testUser',
      phone_number: '010-1234-5678',
      provider: 'kakao',
      uid: '2'
    };

    const res = await request(app)
      .put(`/addusers`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updatedUserData);
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('UPDATE_USER');
  });
});
