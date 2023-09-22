const mongoose = require('mongoose')
const measureUnitSchema = mongoose.Schema({
    unit: {type:String},
    description :{ type: String},
    createdBy :{ type: String},
},{timestamps:true})

module.exports = mongoose.model('MeasureUnit',measureUnitSchema)