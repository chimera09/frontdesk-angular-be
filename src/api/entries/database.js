const { findByIdAndDelete } = require('../../database/models/entries')
const entries = require('../../database/models/entries')

module.exports = {
    getAll: (from, limit, startDate, endDate) => entries.find({
        // date: {
        //     $gte: new Date(startDate),
        //     $lte: new Date(endDate)
        // }
    }).skip(parseInt(from) * parseInt(limit)).limit(parseInt(limit)),
    getAllByDate: (today) => entries.find({
        date: {
            $gte: today
        }
    }),
    create: entry => { entry.date = new Date(); entries.create(entry) },
    count: (startDate, endDate) => entries.count({
        // date: {
        //     $gte: new Date(startDate),
        //     $lte: new Date(endDate)
        // }
    }),
    update: (id, newEntry) => entries.findByIdAndUpdate(id, newEntry),
    delete: id => entries.findByIdAndDelete(id).lean().exec()
}