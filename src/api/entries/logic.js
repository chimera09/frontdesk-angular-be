const database = require('./database')

module.exports = {
    getAll: () => Promise.all([database.getAll(), database.count()]),
    create: entry => database.create(entry),
    delete: id => database.delete(id),
    update: (id, newEntry) => database.update(id, newEntry)
}
