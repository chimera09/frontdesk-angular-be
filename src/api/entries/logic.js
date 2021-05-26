const database = require('./database')

module.exports = {
    getAll: (from, limit) => Promise.all([database.getAll(from, limit), database.count()]),
    create: entry => { entry.date = new Date(); database.create(entry) },
    delete: id => database.delete(id),
    update: (id, newEntry) => database.update(id, newEntry)
}
