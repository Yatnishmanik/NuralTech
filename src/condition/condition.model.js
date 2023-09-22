const mongoose = require('mongoose')
const conditionSchema = mongoose.Schema({
    condition: {type: String},
    createdBy: {type: String},
}, {timestamps:true})

module.exports = mongoose.model('Condition',conditionSchema)