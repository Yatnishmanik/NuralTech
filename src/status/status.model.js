const mongoose = require('mongoose')
const statusSchema = mongoose.Schema({
    statusType: {type: String},
    statusName: {type: String},
    nextStatus: [{type: String}], 
    createdBy: {type: String}
},{timestamps:true})

module.exports = mongoose.model('Status',statusSchema)