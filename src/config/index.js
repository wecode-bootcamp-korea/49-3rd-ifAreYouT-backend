const development = {
  type: "mysql",
  host: process.env.TYPEORM_DEV_HOST,
  port: process.env.TYPEORM_DEV_PORT,
  username: process.env.TYPEORM_DEV_USERNAME,
  password: process.env.TYPEORM_DEV_PASSWORD,
  database: process.env.TYPEORM_DEV_DATABASE,
  logging: true,
};

const production = {
  type: "mysql",
  host: process.env.TYPEORM_PROD_HOST,
  port: process.env.TYPEORM_PROD_PORT,
  username: process.env.TYPEORM_PROD_USERNAME,
  password: process.env.TYPEORM_PROD_PASSWORD,
  database: process.env.TYPEORM_PROD_DATABASE,
};

const test = {
  type: "mysql",
  host: process.env.TYPEORM_TEST_HOST,
  port: process.env.TYPEORM_TEST_PORT,
  username: process.env.TYPEORM_TEST_USERNAME,
  password: process.env.TYPEORM_TEST_PASSWORD,
  database: process.env.TYPEORM_TEST_DATABASE,
  logging: true,
};

module.exports = { development, production, test };
