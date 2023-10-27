const request = require('supertest');
const { createApp } = require('../app');
const { dataSource } = require('../src/models/dataSource');

describe('get events with reaction by user', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
    await dataSource.query(`
      INSERT INTO users (email, nickname, phone_number, provider, uid)
      VALUES ('wecode13@gmil.com', 'testUser', '010-1234-5678', 'kakao', '1');
    `);
    await dataSource.query(`
      INSERT INTO categories (category_name)
      VALUES ('testcategoryname');
    `);
    await dataSource.query(`
      INSERT INTO performers (name)
      VALUES ('testname');
    `);
    await dataSource.query(`INSERT INTO promotions (id) VALUES (1)`)
    await dataSource.query(`
      INSERT INTO events (title, playtime, description, status, start_date, end_date, sales_start_date, sales_end_date,
      stage_id, category_id, performer_id, promotion_id)
      VALUES ('testtitle', '2hour', 'test', 'merchantable', NOW(), NOW(), NOW(), NOW(), 1, 1, 1, 1);
    `);
    await dataSource.query(`
      INSERT INTO event_reactions (id, reaction_type, event_id, user_id)
      VALUES (1, 'exited', 1, 1);
    `);
  });

  afterAll(async () => {
    await dataSource.query(`SET foreign_key_checks = 0;`);
    await dataSource.query(`TRUNCATE users`);
    await dataSource.query(`TRUNCATE categories`);
    await dataSource.query(`TRUNCATE performers`);
    await dataSource.query(`TRUNCATE events`);
    await dataSource.query(`TRUNCATE event_reactions`);
    await dataSource.query(`TRUNCATE promotions`);
    await dataSource.query(`SET foreign_key_checks = 1;`);
    await dataSource.destroy();
  });

  test('INVALID_LIKES: invalid user likes', async () => {
    await request(app)
      .get(`/events/likes`)
      .set('Authorization',
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MX0sImlhdCI6MTY5NzcxOTY0MiwiZXhwIjoxNzAwMzExNjQyfQ.zuVcbarIWTuPPBm7DvoaYRsKGFV8YJPK68fa2gztFeU`
      )
      .expect('Content-Type', /json/)
      .expect(400)
       expect({ error: 'LIKED_EVENTS_NOT_FOUND' });
  });

  test('UNLIKES: event unlikes', async () => {
    await request(app)
      .get(`/events/likes?userId=3&reactionType=unexited`)
      .set('Authorization',
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MX0sImlhdCI6MTY5NzcxOTY0MiwiZXhwIjoxNzAwMzExNjQyfQ.zuVcbarIWTuPPBm7DvoaYRsKGFV8YJPK68fa2gztFeU`
      )
      .expect('Content-Type', /json/)
      .expect(400)
       expect({ error: 'EVENT_UNEXITED' });
  });

  test('GET_likes: user likes', async () => {
    const res = await request(app)
    .get(`/events/likes?userId=1&reactionType=exited`)
    .set('Authorization', 
    `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MX0sImlhdCI6MTY5NzcxOTY0MiwiZXhwIjoxNzAwMzExNjQyfQ.zuVcbarIWTuPPBm7DvoaYRsKGFV8YJPK68fa2gztFeU`
    )

    expect(res.body).toEqual(
      {
        "data": [
            {
                "event_id": 1,
                "eventName": "아리아나 그란데 내한",
                "eventDate": "2023-07-31T15:00:00.000Z",
                "performer": "ariana grande",
                "category": "콘서트"
            }
        ],
        "message": "LIKED_EVENTS_FOUND"
    }
    )
  });
});