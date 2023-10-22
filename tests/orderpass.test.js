const request = require('supertest');
const { createApp } = require('../app');
const { dataSource } = require('../src/models/dataSource');
const jwt = require('jsonwebtoken');

describe('user get ticket', () => {
  let app;
  let accessToken;
  let userId; 

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
      ('testname');
    `);
    await dataSource.query(`
    INSERT INTO preorder_passes
      (event_id, user_id)
    VALUES 
      (1, 1);
    `)
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
     ('testtitle', '2hour', 'test', 'merchantable', NOW(), NOW(), NOW(), NOW(), 1, 1, 1, 1)
    `);

    const userResult = await dataSource.query('SELECT id FROM users WHERE email = ?', ['wecode13@gmil.com']);
    userId = userResult[0].id;

    accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
  });

  afterAll(async () => {
    await dataSource.query(`SET foreign_key_checks = 0;`);
    await dataSource.query(`DELETE FROM event_reactions`);
    await dataSource.query(`TRUNCATE users`);
    await dataSource.query(`TRUNCATE stages`);
    await dataSource.query(`TRUNCATE categories`);
    await dataSource.query(`TRUNCATE performers`);
    await dataSource.query(`TRUNCATE events`);
    await dataSource.query(`TRUNCATE seats`);
    await dataSource.query(`TRUNCATE promotions`)
    await dataSource.query(`SET foreign_key_checks = 1;`);
    await dataSource.destroy();
  });

  test('GET_orderpass: valid orderpass', async () => {
    const res = await request(app)
    .get(`/preorder-pass`)
    .set('Authorization', `Bearer ${accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('GET_ORDERPASS');
    expect(res.body.has_preorder_pass).toBe(1);
  });

  test('INVALID_ORDERPASS: invalid orderpass', async () => {
      const res = await request(app)
      .get(`/preorder-pass?preorderPassesId=222`)
      .set('Authorization', `Bearer ${accessToken}`);
      expect(res.status).toBe(400);
      expect(res.body.message).toEqual('NOT_FOUND_ORDERPASSID');
      // expect(res.body.has_preorder_pass).toBe(0);
  });
});
  