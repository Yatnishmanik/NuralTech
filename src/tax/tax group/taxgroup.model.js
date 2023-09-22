const mongoose = require('mongoose')
const taxSchema = mongoose.Schema({
    tax_group: {type: String},
    
},{timestamps:true})

module.exports = mongoose.model('Taxgroup',taxSchema)