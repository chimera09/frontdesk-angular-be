const { findByIdAndDelete } = require('../../database/models/entries')
const entries = require('../../database/models/entries')

module.exports = {
    getAll: () => entries.find(),
    create: entry => entries.create(entry),
    count: () => entries.count(),
    update: (id, newEntry) => entries.findByIdAndUpdate(id, newEntry),
    delete: id => entries.findByIdAndDelete(id).lean().exec()
}