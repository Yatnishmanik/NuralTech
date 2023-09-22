const mongoose = require('mongoose')
const meterSchema = mongoose.Schema({
    meter: {type:String},
    date: { type: String, default: new Date().toISOString() },
})

module.exports = mongoose.model('Meter',meterSchema)