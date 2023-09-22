const mongoose = require('mongoose')
const CountrySchema = mongoose.Schema({
  country_name:{type: String},
  date: { type: String, default: new Date().toISOString() },
})

module.exports = mongoose.model('Country',CountrySchema)