const { findByIdAndDelete } = require('../../database/models/entries')
const entries = require('../../database/models/entries')

module.exports = {
    getAll: (from, limit) => entries.find().skip(parseInt(from) * parseInt(limit)).limit(parseInt(limit)),
    create: entry => entries.create(entry),
    count: () => entries.count(),
    update: (id, newEntry) => entries.findByIdAndUpdate(id, newEntry),
    delete: id => entries.findByIdAndDelete(id).lean().exec()
}