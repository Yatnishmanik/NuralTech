const mongoose= require('mongoose');
const serviceRequest= mongoose.Schema({
    requestType:{type:String,Required:true},
    requestOn:{type:Date},
    location:{type:String,Required:true},
    requestId:{type:String,Required:true},
    description:{type:String},
    requiredDate:{tyep:Date},
    uploadDate:{type:Date},
    uploadFilePath:{type:String},
    })
module.exports= mongoose.model('serviceRequestModel',serviceRequest);