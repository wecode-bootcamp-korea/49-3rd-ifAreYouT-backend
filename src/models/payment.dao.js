const { dataSource } = require('./dataSource');

const putPaymentInfo = async () => {
  console.log('dao-showMain');
  //231023 
  const data = await dataSource.query(`
  select * from payment`);
  console.log(data);
  return data;
};
module.exports = {
  putPaymentInfo,
};
