const mongoose = require('mongoose')
const modelSchema = mongoose.Schema({
    model_name: {type: String},
   
},{timestamps:true})

module.exports = mongoose.model('Model',modelSchema)