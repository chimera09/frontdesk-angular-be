const { check } = require('express-validator')
const checkLogin = [
    check('username').isEmail(),
    check('password').isLength({ min : 1 })
]
module.exports = {
    checkLogin
}