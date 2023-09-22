const mongoose = require('mongoose')


const taxSchema = mongoose.Schema({
    tax_name: {type: String},
    tax_value: {type: String},
    tax_group: {
        type: mongoose.Schema.ObjectId,
        ref: "Taxgroup", 
    },
   
},{timestamps:true})

module.exports = mongoose.model('Tax',taxSchema)