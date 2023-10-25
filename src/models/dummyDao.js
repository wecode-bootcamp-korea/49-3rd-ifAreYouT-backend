const { makeSeatDummy, makeEventSeatDummy } = require('../utils/makedummy');

/**
 * @function addCategoriesQuery
 * @key categoryName
 * @returns
 */
const addCategoriesQuery = (value) => {
  return `INSERT INTO categories (category_name) VALUES ${value}`;
};
/**
 * @function addPerformersQuery
 * @key name
 * @returns
 */
const addPerformersQuery = (value) => {
  return `INSERT INTO performers (name) VALUES ${value}`;
};
/**
 * @function addStagesQuery
 * @key name
 * @returns
 */
const addStagesQuery = (value) => {
  return `INSERT INTO stages (name) VALUES ${value}`;
};
/**
 * @function addSeatGradesQuery
 * @key grade
 * @key price
 * @key stageId
 * @returns
 */
const addSeatGradesQuery = (value) => {
  return `INSERT INTO seat_grades (grade, price, stage_id) VALUES ${value}`;
};
/**
 * @function addEventsQuery
 * @key title
 * @key playtime
 * @key description
 * @key status
 * @key startDate
 * @key endDate
 * @key salesStartDate
 * @key salesEndDate
 * @key stageId
 * @key categoryId
 * @key performerId
 * @returns
 */
const addEventsQuery = (value) => {
  return `INSERT INTO events (title, playtime, description, status, start_date, end_date, sales_start_date, sales_end_date, stage_id, category_id, performer_id) VALUES ${value}`;
};
/**
 * @function addSeatsQuery
 * @key rowName
 * @key colName
 * @key stageId
 * @key gradeId
 * @returns
 */
const addSeatsQuery = (value) => {
  return `INSERT INTO seats (row_name, col_name, stage_id, grade_id) VALUES ${value}`;
};
/**
 * @function addEventSeatsQuery
 * @key status
 * @key eventId
 * @key seatId
 * @returns
 */
const addEventSeatsQuery = (value) => {
  return `INSERT INTO event_seats (status, event_id, seat_id) VALUES ${value}`;
};

const addCategoriesDummy = async (queryRunner) => {
  await queryRunner.query(addCategoriesQuery(`('콘서트')`));
};
const addPerformersDummy = async (queryRunner) => {
  await queryRunner.query(addPerformersQuery(`('ariana grande')`));
};
const addStagesDummy = async (queryRunner) => {
  await queryRunner.query(addStagesQuery(`('고척돔')`));
};
const addSeatGradesDummy = async (queryRunner) => {
  await queryRunner.query(
    addSeatGradesQuery(
      `('R', '200000', 1),('S', '180000', 1),('A', '160000',1),('C', '140000',1)`,
    ),
  );
};
const addEventsDummy = async (queryRunner) => {
  await queryRunner.query(
    addEventsQuery(
      `('아리아나 그란데 내한', '2시간', '어쩌구저쩌구', 'merchantable', '2023-08-01', '2023-09-01','2023-08-01', '2023-09-01', 1, 1, 1)`,
    ),
  );
};
const addSeatsDummy = async (queryRunner) => {
  await queryRunner.query(addSeatsQuery(makeSeatDummy(1, 1, 1, 4)));
};
const addEventSeatsDummy = async (queryRunner) => {
  await queryRunner.query(addEventSeatsQuery(makeEventSeatDummy(1)));
};

module.exports = {
  queries: {
    addCategoriesQuery,
    addPerformersQuery,
    addStagesQuery,
    addSeatGradesQuery,
    addEventsQuery,
    addSeatsQuery,
    addEventSeatsQuery,
  },
  makeDummies: {
    addCategoriesDummy,
    addPerformersDummy,
    addStagesDummy,
    addSeatGradesDummy,
    addEventsDummy,
    addSeatsDummy,
    addEventSeatsDummy,
  },
};
