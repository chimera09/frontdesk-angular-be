const mongoose = require('mongoose')
const CONSTANTS = require('../../utils/constants')

const entriesSchema = mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    phone: String,
    company: String,
    date: Date
})

module.exports = mongoose.model(CONSTANTS.DATABASE.COLLECTIONS.ENTRIES, entriesSchema)
