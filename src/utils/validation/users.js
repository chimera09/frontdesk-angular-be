const { check } = require('express-validator')
const checkRegister = [
    check('user.surname').isAlpha(),
    check('user.name').isAlpha(),
    check('user.email').isEmail(),
    check('user.phone').isNumeric(),
    check('user.role').isLength({ min: 4 }),
]
module.exports = {
    checkRegister
}