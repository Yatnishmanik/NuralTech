const mongoose = require('mongoose')
const brandSchema = mongoose.Schema({
    brand_type: {type: String},
    date: { type: String, default: new Date().toISOString() },
})

module.exports = mongoose.model('Brand',brandSchema)