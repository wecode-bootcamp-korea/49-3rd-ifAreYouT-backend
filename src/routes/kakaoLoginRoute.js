const express = require('express');
const passport = require('passport');
const authRouter = express.Router();

const kakaoLoginController = require('../controllers/kakaoLoginController');

authRouter.get('/kakao/callback', passport.authenticate('kakao'), kakaoLoginController.kakaoLogin);

module.exports = { kakaoLoginRouter: authRouter };
