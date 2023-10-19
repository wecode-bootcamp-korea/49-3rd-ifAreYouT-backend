const kakaoLogin = async (req, res) => {
    if (req.user) {
        if (req.user.userId) {
            const { userId } = req.user;
            res.json({
                message: '새로운 사용자입니다!',
                statusCode: 201,
                userId
            });
        } else if (req.user.token) {
            const { token, provider } = req.user;
            res.json({
                message: "로그인 성공!",
                statusCode: 200,
                token,
                provider
            });
        }
    } else {
        res.status(400).json({ message: "로그인 실패!", statusCode: 400 });
    }
}

module.exports = {
    kakaoLogin
}
