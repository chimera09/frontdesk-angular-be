const { check } = require('express-validator')
const checkEntries = [
    check('entry.surname').isAlpha(),
    check('entry.name').isAlpha(),
    check('entry.email').isEmail(),
    check('entry.phone').isNumeric(),
    check('entry.company').isLength({ min : 1 }),
]
module.exports = {
    checkEntries
}