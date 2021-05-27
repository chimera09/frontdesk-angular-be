const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../utils/constants')

module.exports = {
    handleResponse: (status, code) => {
        return {status: status, code: code}
    },
    hashPass: password => {
        return bcrypt.hashSync(password, SALT_ROUNDS)
    },
    simpleHtmlTemplating: (source, model) => {
        Object.keys(model).forEach(key => {
            source = source.replace(new RegExp(`{${key}}`, 'g'), model[key])
        })
        return source
    },
}