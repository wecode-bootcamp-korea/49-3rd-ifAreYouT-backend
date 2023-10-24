const { dataSource } = require('./dataSource');

const putPaymentInfo = async (userId, amount, orderNumber) => {
  console.log('dao-putpaymentinfo');
  console.log('orderno', orderNumber);

  const order_no = await dataSource.query(
    `SELECT ID FROM ORDERS WHERE order_no = '${orderNumber}'`,
  );
  console.log('order_id', order_no);
  const order_id = order_no[0].ID;

  console.log('orderno', order_id);
  const status = 'SUCCESS';
  const data = await dataSource.query(`
  INSERT INTO payments (user_id,amount, status,order_id, method_id)
    VALUES (${userId},${amount},'${status}',${order_id},1);
  `);
  // const data1 = await dataSource.query(`
  // INSERT INTO payments (user_id,amount, status,order_id, method_id)
  //   VALUES (${userId},${amount},'${status}',${order_id},1);
  // `);
};
module.exports = {
  putPaymentInfo,
};
