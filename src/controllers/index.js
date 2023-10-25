const ticketController = require("./ticketController")
const authController = require('./kakaoLoginController','./naverLoginController')


module.exports = {
    ticketController,
    authController,
}