const database = require('./database')

module.exports = {
    getAll: (from, limit) => Promise.all([database.getAll(from, limit), database.count()]),
    getAllByDate: (today) => database.getAllByDate(today),
    create: entry => database.create(entry),
    delete: id => database.delete(id),
    update: (id, newEntry) => database.update(id, newEntry)
}
