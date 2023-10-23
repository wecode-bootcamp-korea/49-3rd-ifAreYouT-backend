const request = require('supertest');
const { createApp } = require('../app');
const { dataSource } = require('../src/models/dataSource');

describe('adduser created info', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
    await dataSource.query(`
    INSERT INTO users 
      (id, email, nickname, phone_number, provider, uid)
    VALUES 
      (1, 'wecode13@gmil.com', 'testUser', '010-1234-5678', 'kakao', '1');
    `);
  });

  afterAll(async () => {
    await dataSource.query(`SET foreign_key_checks = 0;`);
    await dataSource.query(`TRUNCATE users`);
    await dataSource.query(`SET foreign_key_checks = 1;`);
    await dataSource.destroy();
  });

  test('FALIED : failed created user', async () => {
    await request(app)
      .post(`/users`)
      .set('Authorization', 
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MX0sImlhdCI6MTY5NzcxOTY0MiwiZXhwIjoxNzAwMzExNjQyfQ.zuVcbarIWTuPPBm7DvoaYRsKGFV8YJPK68fa2gztFeU`
      )
      .send({
          "email" : "ere2442@gmail.com", 
          "nickname" : "ajh3222",
          "phoneNumber" : "010-1212-5098",
          "provider" : ""
      })
      .expect('Content-Type', /json/)
      .expect({ error: '400 KEY_ERROR' });
  });

  test('SUCCESS: add created user', async () => {
     const res = await request(app)
      .post(`/users`)
      .set('Authorization', 
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MX0sImlhdCI6MTY5NzcxOTY0MiwiZXhwIjoxNzAwMzExNjQyfQ.zuVcbarIWTuPPBm7DvoaYRsKGFV8YJPK68fa2gztFeU`
      )
      .send({
        "email" : "ere2442@gmail.com", 
        "nickname" : "ajh3222",
        "phoneNumber" : "010-1212-5098",
        "provider" : "kakao"
    })
    .expect(200)
    expect(res.body).toEqual(
      {
         message: "SUCCESS",
         data: 
          {
            email: "ere2442@gmail.com", 
            nickname: "ajh3222",
            phoneNumber: "010-1212-5098",
            provider: "kakao"
          }
     });
  });
});

describe('updateuser info', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
    await dataSource.query(`
      INSERT INTO users 
        (email, nickname, phone_number, provider, uid)
      VALUES 
        ('wecode13@gmil.com', 'testUser', '010-1234-5678', 'kakao', '1');
      `);
  });

  afterAll(async () => {
    await dataSource.query(`SET foreign_key_checks = 0;`);
    await dataSource.query(`TRUNCATE users`);
    await dataSource.query(`SET foreign_key_checks = 1;`);
    await dataSource.destroy();
  });

  test('FALIED : failed updated user', async () => {
    await request(app)
      .put(`/users?userId=1`)
      .set('Authorization', 
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MX0sImlhdCI6MTY5NzcxOTY0MiwiZXhwIjoxNzAwMzExNjQyfQ.zuVcbarIWTuPPBm7DvoaYRsKGFV8YJPK68fa2gztFeU`
      )
      .send({
        "email" : "ere2442@gmail.com",
        "nickname" : "ajh3222",
        "phoneNumber" : ""
    })
    .expect('Content-Type', /json/)
    .expect({ error: '400 KEY_ERROR' });
  });

  test('SUCCESS: update user info', async () => {
    const res = await request(app)
      .put(`/users?userId=1`)
      .set('Authorization', 
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MX0sImlhdCI6MTY5NzcxOTY0MiwiZXhwIjoxNzAwMzExNjQyfQ.zuVcbarIWTuPPBm7DvoaYRsKGFV8YJPK68fa2gztFeU`
      )
      .send({
        "email" : "ere2442@gmail.com",
        "nickname" : "ajh3222",
        "phoneNumber" : "010-1234-5678"
       })
      expect(res.body).toEqual(
        {
           message: "UPDATE_USER",
           data:
            {
              email: "ere2442@gmail.com", 
              nickname: "ajh3222",
              phoneNumber: "010-1234-5678",
              userId: "1"
            }
       });
    });
  });
