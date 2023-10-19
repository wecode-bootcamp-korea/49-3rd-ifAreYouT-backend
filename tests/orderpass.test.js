const request = require('supertest');
const { createApp } = require('../app');
const { dataSource } = require('../src/models/dataSource');
const jwt = require('jsonwebtoken');

describe('user get ticket', () => {
  let app;
  let userId;
  let accessToken;

  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
    await dataSource.query(`DELETE FROM event_reactions`);
    await dataSource.query(`
    INSERT INTO users 
      (email, nickname, phone_number, provider, uid)
    VALUES 
      ('wecode13@gmil.com', 'testUser', '010-1234-5678', 'kakao', '1');
    `);
    await dataSource.query(`
    INSERT INTO stages
      (name) 
    VALUES 
      ('testname');
    `);
    await dataSource.query(`
    INSERT INTO payment_methods
      (id, method)
    VALUES
      (1, 'testmethod');
    `)
    await dataSource.query(`
    INSERT INTO seat_grades 
      (grade, price, stage_id) 
    VALUES 
      (1, 1, 1)
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
    await dataSource.query(`DELETE FROM events`);
    await dataSource.query(`
    INSERT INTO events 
      (id, title, playtime, description, status, start_date, end_date, sales_start_date, sales_end_date,
      stage_id, category_id, performer_id, promotion_id) 
    VALUES
     (1, 'testtitle', '2hour', 'test', 'merchantable', NOW(), NOW(), NOW(), NOW(), 1, 1, 1, 1)
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
    INSERT INTO payments
     (id, amount, status, user_id, order_id, method_id)
    VALUES
     (1, 1, 'pending', 1, 1, 1);
    `)
    await dataSource.query(`
    INSERT INTO event_orders
     (id, time_id, seat_id, order_id, order_name, ticket_code)
    VALUES
     (1, 1, 1, 1, 'testordername', 'testticketcode')
    `);

    const userResult = await dataSource.query('SELECT * FROM users WHERE email = ?', ['wecode13@gmil.com']);

    userId = userResult[0].id;
    accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
  });

  afterAll(async () => {
    await dataSource.query(`SET foreign_key_checks = 0;`);
    await dataSource.query(`DELETE FROM event_reactions`);
    await dataSource.query(`TRUNCATE users`);
    await dataSource.query(`TRUNCATE payments`);
    await dataSource.query(`TRUNCATE payment_methods`);
    await dataSource.query(`TRUNCATE stages`);
    await dataSource.query(`TRUNCATE seat_grades`);
    await dataSource.query(`TRUNCATE categories`);
    await dataSource.query(`TRUNCATE performers`);
    await dataSource.query(`TRUNCATE events`);
    await dataSource.query(`TRUNCATE times`);
    await dataSource.query(`TRUNCATE seats`);
    await dataSource.query(`TRUNCATE orders`);
    await dataSource.query(`TRUNCATE event_orders`);
    await dataSource.query(`TRUNCATE promotions`)
    await dataSource.query(`SET foreign_key_checks = 1;`);
    await dataSource.destroy();
  });

  test('GET_orderpass: valid orderpass', async () => {
    const res = await request(app)
    .get(`/preorder-pass`)
    .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual('GET_ORDERPASS');
  });

  test('INVALID_ORDERPASS: invalid orderpass', async () => {
    try {
      const res = await request(app)
      .get(`/preorder-pass`)
      .set('Authorization', `Bearer ${accessToken}`);
      expect(res.status).toBe(400);
      expect(res.body.message).toEqual('NOT_FOUND_ORDERPASS');
    } catch (error) {
     console.log(error);
    }
  });
});
