const { default: Axios } = require('axios');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const axios = Axios.create({
  headers: {
    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
});

/**
 * generateToken
 * @param {string} data - 토큰을 만들 키 - 값
 * @returns token
 */
const generateToken = (data) => {
  return jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

/**
 * verifyToken
 * @param {*} token - jwt 토큰
 * @returns decode 된 토큰
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_SECRET,
    );
    return decoded;
  } catch (error) {
    return null;
  }
};

/**
 * isValidData
 * @param {string | RegExp} reg - 정규 표현식
 * @param {string} validationTarget - 검증할 문자열
 * @returns
 */
const isValidData = (reg, validationTarget) => {
  return reg.test(validationTarget);
};

/**
 * throwError
 * @param {number} code - 에러 상태 코드
 * @param {string} message - 커스텀 하고 싶은 메시지
 * @returns new Error
 */
const throwError = (code, message) => {
  if (!code) return;
  const error = new Error();
  let errorMessage = new Map([
    [400, 'bad request'],
    [401, 'unAuthorized'],
    [500, 'internal server error'],
  ]);
  if (!errorMessage.get(code) || message) {
    errorMessage.set(code, message);
  }
  error.message = errorMessage.get(code);
  error.status = code;
  throw error;
};

const isEmptyObject = (obj) => {
  return _.every(_.values(obj), (value) => Boolean(value));
};

const isAllDataHasValue = (data) => {
  if (Array.isArray(data)) {
    return _.every(data, (obj) => {
      return isEmptyObject(obj);
    });
  } else {
    return isEmptyObject(data);
  }
};

const generateOrderNumber = () => {
  function pad(number, length) {
    let str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }
  const now = new Date();
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1, 2);
  const day = pad(now.getDate(), 2);
  const hours = pad(now.getHours(), 2);
  const minutes = pad(now.getMinutes(), 2);
  const seconds = pad(now.getSeconds(), 2);
  const milliseconds = pad(now.getMilliseconds(), 3);
  const formattedTimestamp = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;

  return formattedTimestamp;
};

const useTransaction = async (dataSource, queries) => {
  const queryRunner = await dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const results = {};
    for (const query of queries) {
      const result = await query(queryRunner);
      Object.assign(results, result);
    }
    await queryRunner.commitTransaction();
    return results;
  } catch (err) {
    console.error(err);
    throwError(500, 'transaction failed'),
      await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

module.exports = {
  axios,
  generateToken,
  verifyToken,
  isValidData,
  throwError,
  useTransaction,
  isEmptyObject,
  isAllDataHasValue,
  generateOrderNumber,
};
