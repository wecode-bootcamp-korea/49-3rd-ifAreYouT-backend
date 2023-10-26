const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const jwt = require('jsonwebtoken');
require("dotenv").config()
const { throwError } = require('../utils');
const {
    kakaoCreateUserDao,
    naverCreateUserDao,
    findByKakaoId,
    findByNaverId
} = require('../models/userDao');


const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

passport.use('kakao', new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: "http://localhost:8000/auth/kakao/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            const kakaoId = profile.id;
            const exUser = await findByKakaoId(kakaoId);

            if (exUser) {
                const userId = exUser.id;
                const jwtToken = generateToken(userId);

                if (!jwtToken) {
                    return done(throwError(404, '토큰 발급 실패'))
                }

                const exUserData = {
                    token: jwtToken,
                    provider: exUser.provider // 유저 타입 (예: 카카오, 네이버)
                };

                if (!exUserData) {
                    return done(throwError(404, '유저 데이터 불러오기 실패'));
                } else {
                    const newUserData = {
                        userId: userId,
                        nickname: profile.username,
                        email: profile._json.kakao_account.email,
                    };

                    const newUser = await kakaoCreateUserDao(
                        kakaoId, newUserData.nickname, newUserData.email
                        );
                    if (!newUser) {
                        return done(throwError(404, '가입 사용자 데이터 오류'));
                    }



                    done(null, newUserData);
                }
            }

        } catch (error) {
            console.error('KakaoStrategy Error:', error);
            done(error);
        }
    })
);

passport.use('naver', new NaverStrategy({
    clientID: process.env.NAVER_ID, // 네이버 클라이언트 ID
    clientSecret: process.env.NAVER_SECRET, // 네이버 클라이언트 시크릿
    callbackURL: 'http://localhost:8000/auth/naver/callback', // 네이버 로그인 콜백 URL
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            const naverId = profile.id
            const exUser = await findByNaverId(naverId)

            if (exUser) {
                const userId = exUser.id;
                const jwtToken = generateToken(userId);
            }
            if (!jwtToken) {
                return done(throwError(404, '토큰 발급 실패'))
            }
            const exUserData = {
                token: jwtToken,
                provider: exUser.provider // 유저 타입 (예: 카카오, 네이버)
            };

            if (!exUserData) {
                return done(throwError(404, '유저 데이터 불러오기 실패'));
            } else {

                const newUserData = {
                    userId: naverId,
                    nickname: profile.displayName,
                    email: profile.emails[0].value

                };
                const newUser = await naverCreateUserDao(
                    naverId, newUserData.nickname, newUserData.email
                );
                if (!newUser) {
                    return done(throwError(404, '가입 사용자 데이터 오류'));
                }



                done(null, newUserData);
            }
        } catch (error) {
            console.error('NaverStrategy Error:', error);
            done(error);
        }
    }));
