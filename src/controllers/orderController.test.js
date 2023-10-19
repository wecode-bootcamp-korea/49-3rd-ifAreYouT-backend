const request = require('supertest');

const { createApp } = require('../../app');
const { dataSource } = require('../models/dataSource');
const { useTransaction } = require('../utils');
const { makeDummies, queries } = require('../models').dummyDao;
const {
  addCategoriesDummy,
  addPerformersDummy,
  addStagesDummy,
  addSeatGradesDummy,
  addEventsDummy,
  addSeatsDummy,
  addEventSeatsDummy,
} = makeDummies;
const { addEventsQuery } = queries;
describe('좌석 정보 가져오기', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
  });
  afterAll(async () => {
    await Promise.all([
      dataSource.query(`DELETE FROM event_seats`),
      dataSource.query(`DELETE FROM seat_grades`),
      dataSource.query(`DELETE FROM seats`),
      dataSource.query(`DELETE FROM events`),
      dataSource.query(`DELETE FROM categories`),
      dataSource.query(`DELETE FROM performers`),
      dataSource.query(`DELETE FROM stages`),
    ]);
    await dataSource.destroy();
  }, 10000);

  test('🚫FAILED: eventId가 없을때', async () => {
    await request(app)
      .get('/orders/seats')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MX0sImlhdCI6MTY5NzcxOTY0MiwiZXhwIjoxNzAwMzExNjQyfQ.zuVcbarIWTuPPBm7DvoaYRsKGFV8YJPK68fa2gztFeU',
      )
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({ error: 'required query parameter eventId is missing' });
  });
  test('🚫FAILED: eventId는 있으나 해당하는 공연 데이터가 없을때', async () => {
    await request(app)
      .get('/orders/seats?eventId=3')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MX0sImlhdCI6MTY5NzcxOTY0MiwiZXhwIjoxNzAwMzExNjQyfQ.zuVcbarIWTuPPBm7DvoaYRsKGFV8YJPK68fa2gztFeU',
      )
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({ error: 'no event data' });
  });
  test('🚫FAILED: 공연에 해당하는 좌석 데이터가 없을때', async () => {
    await request(app)
      .get('/orders/seats?eventId=1')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MX0sImlhdCI6MTY5NzcxOTY0MiwiZXhwIjoxNzAwMzExNjQyfQ.zuVcbarIWTuPPBm7DvoaYRsKGFV8YJPK68fa2gztFeU',
      )
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({ error: 'no seat data' });
  });
  test('✅SUCCESS: 공연 좌석 데이터 가져오기', async () => {
    useTransaction(dataSource, [
      addCategoriesDummy,
      addPerformersDummy,
      addStagesDummy,
      addSeatGradesDummy,
      addEventsDummy,
      addSeatsDummy,
      addEventSeatsDummy,
    ]);
    await request(app)
      .get('/orders/seats?eventId=1')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MX0sImlhdCI6MTY5NzcxOTY0MiwiZXhwIjoxNzAwMzExNjQyfQ.zuVcbarIWTuPPBm7DvoaYRsKGFV8YJPK68fa2gztFeU',
      )
      .expect('Content-Type', /json/);
  });
});
