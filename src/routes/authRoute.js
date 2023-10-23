const express = require('express');
const passport = require('passport');
const authRouter = express.Router();

const { authController } = require('../controllers');

authRouter.get('/kakao/callback', passport.authenticate('kakao'), authController.kakaoLogin);

module.exports = { authRouter };
