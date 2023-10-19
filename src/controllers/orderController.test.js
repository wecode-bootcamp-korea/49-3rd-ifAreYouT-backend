const request = require('supertest');

const { createApp } = require('../../app');
const { dataSource } = require('../models/dataSource');
const { getSeatsDataDao } = require('../models/orderDao/orderDao');

describe('좌석 정보 가져오기', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
  });
  afterAll(async () => {
    await dataSource.destroy();
  });

  test('🚫FAILED: eventId가 없을때', async () => {
    await request(app)
      .get('/orders/seats')
      .expect(400)
      .expect({ error: 'required query parameter eventId is missing' });
  });
  test('🚫FAILED: eventId는 있으나 해당하는 공연 데이터가 없을때', async () => {
    await request(app)
      .get('/orders/seats?eventId=3')
      .expect(400)
      .expect({ error: 'no event data' });
  });
  test('🚫FAILED: 공연에 해당하는 좌석 데이터가 없을때', async () => {
    await request(app)
      .get('/orders/seats?eventId=1')
      .expect(400)
      .expect({ error: 'no seat data' });
  });
  test('SUCCESS: 공연 좌석 데이터 가져오기', async () => {
    await request(app).get('/orders/seats?eventId=1');
  });
});
