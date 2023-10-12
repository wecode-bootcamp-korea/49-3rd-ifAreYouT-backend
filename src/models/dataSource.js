require('dotenv').config();
const config = require('../config');
const { development, test, production } = config;
const { DataSource } = require('typeorm');
const dataSource = new DataSource(
  process.env.NODE_ENV === 'development'
    ? development
    : process.env.NODE_ENV === 'production'
    ? production
    : test,
);

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = {
  dataSource,
};
