const { throwError, verifyToken } = require('../utils');

exports.verificateToken = (req, _, next) => {
  const token = req.header('Authorization');
  try {
    if (!token) throwError(401);
    const data = verifyToken(token);
    if (data) {
      req.userData = data;
      next();
    } else {
      throwError(401, 'invalid token');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
