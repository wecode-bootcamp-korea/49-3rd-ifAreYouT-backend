const { myDataSource } = require('./dataSource');

const showPaymentMethods = async () => {
  console.log('dao-showMain');
  const data = await myDataSource.query(`select * from payment`);
  console.log(data);
  return data;
};
module.exports = {
  showPaymentMethods,
};