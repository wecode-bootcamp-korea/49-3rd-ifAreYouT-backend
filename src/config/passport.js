const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')


const { userDao } = require('../models');
const { throwError } = require('../utils');
const { findByKakaoId, createUser } = userDao;

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.USERID);
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
                    const newUser = await createUser(kakaoId);
                    if (!newUser) {
                        return done(throwError(404, '가입 사용자 데이터 오류'));
                    }

                    const newUserData = {
                        userId: newUser.id,
                        email: newUser.email,
                        nickname: newUser.nickname
                    };

                    done(null, newUserData);
                }
            }

        } catch (error) {
            console.error(error);
            done(error);
        }
    })
);
