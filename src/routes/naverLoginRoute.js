const express = require('express');
const passport = require('passport');
const authRouter = express.Router();

const naverLoginController = require('../controllers/naverLoginController');

authRouter.get('/naver/callback', passport.authenticate('naver'), naverLoginController.handleNaverLogin);

module.exports = { naverLoginRouter: authRouter };
