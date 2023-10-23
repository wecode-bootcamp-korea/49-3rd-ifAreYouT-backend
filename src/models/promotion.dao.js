const { dataSource } = require('./dataSource');

const getQuestionsByPromoId = async (promotionId) => {
  console.log('dao-showPromotion');
  const data = await dataSource.query(`
  SELECT PERFORMER_QUESTION AS performerQuestion
  FROM QUESTIONS
  WHERE PROMOTION_QUESTION_ID = ${promotionId}`);

  console.log(data);
  return data;
};
const putPreorderPass = async (map) => {
  console.log('dao-showPromotion');
  for (let i = 0; i < 5; i++) {
    const data = await dataSource.query(`
    SELECT 
    CASE
        WHEN performer_answer = 1 THEN 1
        ELSE 0
    END AS decoded_value
FROM
    questions
    where questions[i] = map[i] `);
    if (data) continue;
    else break;
  }
  console.log('data', data);
  return data;
};
module.exports = {
  getQuestionsByPromoId,
  putPreorderPass,
};
