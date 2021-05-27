const users = require('../../database/models/users')

module.exports = {
    getAll: () => users.find({}).lean().exec(),
    getById: id => users.findById(id).lean().exec(),
    update: (id,user) => users.findByIdAndUpdate(id,user).lean().exec(),
    create: user => users.create(user),
    getByName: name => users.findOne({ name: name }).lean().exec(),
    getByEmail: email => users.findOne({ email: email}).lean().exec(),
    getByIdAndUpdate: (id, password) => users.findByIdAndUpdate(id, { $set: { password: password } })
}
