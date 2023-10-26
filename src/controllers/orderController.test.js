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
describe('좌석 정보 가져오기', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
    addCategoriesDummy(dataSource);
    addPerformersDummy(dataSource);
    addStagesDummy(dataSource);
    addSeatGradesDummy(dataSource);
    addEventsDummy(dataSource);
    addSeatsDummy(dataSource);
    addEventSeatsDummy(dataSource);
  });
  afterAll(async () => {
    await dataSource.query(`SET foreign_key_checks = 0;`);
    await dataSource.query(`TRUNCATE event_seats`);
    await dataSource.query(`TRUNCATE seat_grades`);
    await dataSource.query(`TRUNCATE seats`);
    await dataSource.query(`TRUNCATE events`);
    await dataSource.query(`TRUNCATE categories`);
    await dataSource.query(`TRUNCATE performers`);
    await dataSource.query(`TRUNCATE stages`);
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
  test('✅SUCCESS: 공연 좌석 데이터 가져오기', async () => {
    const response = await request(app)
      .get('/orders/seats?eventId=1')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MX0sImlhdCI6MTY5NzcxOTY0MiwiZXhwIjoxNzAwMzExNjQyfQ.zuVcbarIWTuPPBm7DvoaYRsKGFV8YJPK68fa2gztFeU',
      )
      .expect('Content-Type', /json/);
    expect(response.body).toEqual({
      data: {
        seats: [
          {
            id: 1,
            name: 'A-1',
            row: 'A',
            col: 1,
            grade: 'R',
            status: 'available',
          },
        ],
        detail: [
          {
            grade: 'R',
            price: '200000',
          },
          {
            grade: 'S',
            price: '180000',
          },
          {
            grade: 'A',
            price: '160000',
          },
          {
            grade: 'C',
            price: '140000',
          },
        ],
      },
    });
  });
});
