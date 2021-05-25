const mongoose = require('mongoose')
const CONSTANTS = require('../../utils/constants')

const usersSchema = mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    phone: String,
    password: String,
    role: String,
})

module.exports = mongoose.model(CONSTANTS.DATABASE.COLLECTIONS.USERS, usersSchema)