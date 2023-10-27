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
const putPreorderPass = async (userId, eventId, promotionId, ans) => {
  console.log('dao-showPromotion');
  const result = await dataSource.query(`
  SELECT performer_answer 
  FROM QUESTIONS
  WHERE promotion_question_id= ${promotionId}
  ORDER BY ID ASC`);

  console.log(result);
  var correct_ans = [];
  for (let i = 0; i < result.length; i++) {
    correct_ans.push(Object.values(result[i])[0]);
  }

  let flag = 0;
  for (let i = 0; i < 5; i++) {
    if (correct_ans[i] == ans[i]) {
      flag = 1;
      console.log(flag);
    } else if (correct_ans[i] != ans[i]) {
      flag = 0;
      console.log(flag);
      break;
    }
  }
  console.log(flag);
  if (flag == 1) {
    const isPreorderPass = await dataSource.query(`
    insert into preorder_passes (event_id, user_id) values(${eventId},${userId})
    `);
    return 1;
  }
  return 0;
};
module.exports = {
  getQuestionsByPromoId,
  putPreorderPass,
};
