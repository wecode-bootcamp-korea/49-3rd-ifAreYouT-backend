const { myDataSource } = require('./dataSource');

const showPromotion = async (promotionId) => {
  console.log('DAO-showPromoQ');
  const data = await myDataSource.query(
    `select * from questions 
  where promotion_question_id = ${promotionId}
  `,
  );
  console.log(data);
  return data;
};
const isPreorderPass = async () => {
  console.log('dao-isPreorderPass');
  const data = await myDataSource.query(`select * from payment`);
  console.log(data);
  return data;
};
module.exports = {
  showPromotion,
  isPreorderPass,
};
