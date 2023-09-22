const mongoose = require('mongoose')
const currencySchema = mongoose.Schema({
  
    currency_name :{type: String},
    currency_sysmbol :{type:String},
    date: { type: String, default: new Date().toISOString() },
})

module.exports = mongoose.model('Currency',currencySchema)