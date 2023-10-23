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
const putPreorderPass = async (promotionId, map) => {
  console.log('dao-showPromotion');
  const result = await dataSource.query(`
  SELECT performer_answer 
  FROM QUESTIONS
  WHERE promotion_question_id= ${promotionId}
  ORDER BY ID ASC`);
  // var string = JSON.stringify(data);
  // for (let i = 0; i < 5; i++) {
  //   // data1 = push(Object.values(data));
  //   console.log(data[i]);
  // }
  var dataList = [];
  for (var data of result) {
    dataList.push(data.performer_answer);
  }
  //const data1 = Object.values(data);
  //   for (let i = 0; i < 5; i++) {
  //     const data = await dataSource.query(`
  //     SELECT
  //     CASE
  //         WHEN performer_answer = 1 THEN 1
  //         ELSE 0
  //     END AS decoded_value
  // FROM
  //     questions
  //     where questions[i] = map[i] `);
  //     if (data) continue;
  //     else break;
  //   }
  // console.log('data', string);

  const isPreorderPass = await dataSource.query(`
  INSERT INTO preorder_passes (event_id, user_id )
VALUES ()`);

  return dataList;
};
module.exports = {
  getQuestionsByPromoId,
  putPreorderPass,
};
