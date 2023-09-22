const mongoose = require('mongoose')
const DepartmentSchema = mongoose.Schema({
    dpt_name:{type:String},
    dpt_code: {type: String},
    contact_person: {type: String},
    description: {type: String}, 
    created_by :{type: String}, 
    
}, {timestamps: true})


module.exports = mongoose.model("Department",DepartmentSchema)