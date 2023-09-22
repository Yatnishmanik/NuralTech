const mongoose = require('mongoose')
const requestTypeSchema = mongoose.Schema({
   
    requestMode: {type: String},
    category: [{categoryName:{type: String}}],
    departmentRequired:{type: Boolean, default: false},
    requestType: {type: String},
    requestTypeCC:[{email:{type: String}}],
    allowItemRequest : {type: Boolean, default: false},
    disablePriceEdit: {type: Boolean, default: false},
    statusForAssetLocation: [{statusId:{type: mongoose.Schema.ObjectId, ref:'Status'}}],
    defaultAssignee: {type: String},
    specificLocationAssignee: [{assetLocation:[{locationId:{type:mongoose.Schema.ObjectId,ref:'Location'}}],
                        assignee:{type:String}
                   }]
},{timestamps:true})

module.exports = mongoose.model('RequestType',requestTypeSchema)