const { dataSource } = require('../models/dataSource')

const findByKakaoId = async (kakaoId) => {
    const userInfo = await dataSource.query(
        `
        SELECT id, provider
        FROM users
        WHERE uid = ?
        `, [kakaoId]
    )
    return userInfo
}
const extraInfoDao = async (phoneNumber, birthDay, userId) => {
    const extraInfo = await dataSource.query(`
        UPDATE users
        SET phone_number = ?, birthday = ?
        WHERE id = ?
    `, [phoneNumber, birthDay, userId]);
    return extraInfo;
}

const createUser = async (kakaoId, nickname, email) => {
    const newUserInfo = await dataSource.query(
        `
        INSERT INTO users (uid, nickname, email)
        VALUES (?, ?, ?)
        `,
        [kakaoId, nickname, email]
    )
    return newUserInfo
}

module.exports = {
    findByKakaoId,
    extraInfoDao,
    createUser
}