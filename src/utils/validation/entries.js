const { check } = require('express-validator')
const checkEntries = [
    check('entry.surname'),
    check('entry.name'),
    check('entry.email').isEmail(),
    check('entry.phone').isNumeric(),
    check('entry.company').isLength({ min : 1 }),
]
module.exports = {
    checkEntries
}