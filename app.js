const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const dotenvPath = process.env.DOTENV_CONFIG_PATH;
require('dotenv').config({ path: dotenvPath });

const app = express();

const indexRouter = require('./src/routes');

app.set('port', process.env.PORT || 8000);
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.use((req, _, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, _, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: `${err.status ? err.status : ''} ${err.message}`,
  });
});

module.exports = app;
