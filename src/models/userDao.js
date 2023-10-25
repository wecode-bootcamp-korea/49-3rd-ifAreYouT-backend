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

const findByNaverId = async (naverId) => {
    const userInfo = await dataSource.query(
        `
        SELECT id, provider
        FROM users
        WHERE uid = ?
        `, [naverId]
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

const kakaoCreateUserDao = async (kakaoId, nickname, email) => {
    const newUserInfo = await dataSource.query(
        `
        INSERT INTO users (uid, nickname, email)
        VALUES (?, ?, ?)
        `,
        [kakaoId, nickname, email]
    )
    return newUserInfo
}

const naverCreateUserDao = async (naverId, nickname, email) => {
    const newUserInfo = await dataSource.query(`
        INSERT INTO users (uid, nickname, email)
        VALUES (?, ?, ?)
        `,
        [naverId, nickname, email]
    )
    return newUserInfo
}

module.exports = {
    findByKakaoId,
    findByNaverId,
    extraInfoDao,
    kakaoCreateUserDao,
    naverCreateUserDao
}