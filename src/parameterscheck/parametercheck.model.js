const mongoose = require('mongoose');
const parameterCheckSchema = mongoose.Schema({
    parameterCheck: {type: String},
    
}, {timestamps:true})

module.exports = mongoose.model('ParameterCheck',parameterCheckSchema)