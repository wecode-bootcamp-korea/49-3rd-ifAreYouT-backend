require('dotenv').config();
const { createApp } = require('./app');
const { dataSource } = require('./src/models/dataSource');

const startServer = async () => {
  const app = createApp();
  await dataSource.initialize();

  const port = process.env.PORT;

  app.listen(port || 8000, () => {
    console.log(`server is running at ${app.get('port')}`);
  });
};

startServer();
