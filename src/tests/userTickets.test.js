const request = require('supertest');
const { createApp } = require('../app');
const { dataSource } = require('../src/models/dataSource');

describe('user get ticket', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
    await dataSource.query(`DELETE FROM event_reactions`);
    await dataSource.query(`
    INSERT INTO users 
      (id, email, nickname, phone_number, provider, uid)
    VALUES 
      (1, 'wecode13@gmil.com', 'testUser', '010-1234-5678', 'kakao', '1');
    `);
    await dataSource.query(`
    INSERT INTO stages
     (name) 
    VALUES 
     ('testname')
    `);
    await dataSource.query(`
    INSERT INTO seat_grades 
      (grade, price, stage_id) 
    VALUES 
      (1, 200000, 1)
    `);
    await dataSource.query(`
    INSERT INTO categories
     (category_name) 
    VALUES 
     ('testcategoryname')
    `);
    await dataSource.query(`
    INSERT INTO performers 
      (name) 
    VALUES 
      ('testname')
    `);
    await dataSource.query(`INSERT INTO promotions (id) VALUES (1)`)
    await dataSource.query(`
    INSERT INTO events 
      (title, playtime, description, status, start_date, end_date, sales_start_date, sales_end_date,
      stage_id, category_id, performer_id, promotion_id) 
    VALUES
     ('아리아나 그란데 내한', '2hour', 'test', 'merchantable', NOW(), NOW(), NOW(), NOW(), 1, 1, 1, 1)
    `);
    await dataSource.query(`
    INSERT INTO times
     (id, event_time, event_day, event_id)
    VALUES
      (1, '03', '23-03-23', 1)
    `);
    await dataSource.query(`
      INSERT INTO seats
      (row_name, col_name, stage_id, grade_id)
      VALUES
        ('test', '123', 1, 1)
    `);
    await dataSource.query(`
    INSERT INTO orders
     (id, user_id, order_no, order_status)
    VALUES
     (1, 1, 123, 'pending');
    `);
    await dataSource.query(`
    INSERT INTO event_orders
     (id, time_id, seat_id, order_id, ticket_code)
    VALUES
     (1, 1, 1, 1, 'testticketcode')
    `);
    
  });

  afterAll(async () => {
    await dataSource.query(`SET foreign_key_checks = 0;`);
    await dataSource.query(`TRUNCATE users`);
    await dataSource.query(`TRUNCATE stages`);
    await dataSource.query(`TRUNCATE seat_grades`);
    await dataSource.query(`TRUNCATE categories`);
    await dataSource.query(`TRUNCATE performers`);
    await dataSource.query(`TRUNCATE events`);
    await dataSource.query(`TRUNCATE times`);
    await dataSource.query(`TRUNCATE seats`);
    await dataSource.query(`TRUNCATE orders`);
    await dataSource.query(`TRUNCATE event_orders`);
    await dataSource.query(`TRUNCATE promotions`);
    await dataSource.query(`SET foreign_key_checks = 1;`);
    await dataSource.destroy();
  });

  test('GET_TICKETS: valid tickets', async () => {
    const res = await request(app)
    .get(`/tickets`)
    .set('Authorization', 
    `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MX0sImlhdCI6MTY5NzcxOTY0MiwiZXhwIjoxNzAwMzExNjQyfQ.zuVcbarIWTuPPBm7DvoaYRsKGFV8YJPK68fa2gztFeU`
    )
    .expect(200);

    expect(res.body).toEqual(
      {
        "message": "GET_TICKETS",
        "data": [
          {
            "ticketCode": "testticketcode",
            "eventName": "아리아나 그란데 내한",
            "rowName": "test",
            "colName": 123,
            "ticketPrice": "200000"
          }
        ]
      }
    )
  });

  test('INVALID_TICKETS: invalid ticketsinfo', async () => {
    await request(app)
      .get(`/tickets?userId=1`)
      .set('Authorization',
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MX0sImlhdCI6MTY5NzcxOTY0MiwiZXhwIjoxNzAwMzExNjQyfQ.zuVcbarIWTuPPBm7DvoaYRsKGFV8YJPK68fa2gztFeU`
      )
      .expect('Content-Type', /json/)
      .expect(400)
       expect({ error: 'NOT_FOUND_TICKETS' });
  });
});
