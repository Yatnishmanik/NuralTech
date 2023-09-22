const mongoose = require('mongoose')
const reasonSchema = mongoose.Schema({
    reason:{type:String},
    createdBy:{type:String},
},{timestamps:true})

module.exports = mongoose.model('Reason',reasonSchema)