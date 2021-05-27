const bcrypt = require('bcrypt')
const generator = require('generate-password')

const { SALT_ROUNDS } = require('../../utils/constants')
const { hashPass } = require('../../utils/helpers')
const database = require('./database')
const { sendNewAccountEmail } = require('../../services/mailer')

module.exports = {
    getAll: () => database.getAll(),
    getByEmail: email => database.getByEmail(email),
    create: async user => {
        user.password = hashPass(generator.generate({
            length: 10,
            numbers: true
        }))

        return database.create(user)
    },
    getById: id => database.getById(id),
    update: (id, user) => {
        if (user.password !== undefined)
            user.password = hashPass(user.password)

        return database.update(id, user)
    }
}