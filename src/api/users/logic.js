const database = require('./database')
const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../../utils/constants')
const { hashPass } = require('../../utils/helpers')
const generator = require('generate-password')

module.exports = {
    getAll: () => database.getAll(),
    create: user => {
        // user.password = hashPass(generator.generate({
        //     length: 10,
        //     numbers: true
        // }))
        user.password = hashPass("1234")
        return database.create(user)
    },
    getById: id => database.getById(id),
    update: (id, user) => {
        if (user.password !== undefined)
            user.password = hashPass(user.password)

        return database.update(id, user)
    }
}