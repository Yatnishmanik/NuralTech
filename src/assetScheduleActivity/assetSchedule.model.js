const mongoose=require('mongoose');
const schema = mongoose.Schema;
const scheduleSchema=mongoose.Schema({
    assetName:[{type:schema.ObjectId,ref:"Asset"}],
    location:{type:schema.ObjectId,ref:"Location"},
    serviceVendor:{type:schema.ObjectId,ref:"Vendor"},
    activity:{type:schema.ObjectId,ref:"ActivityType"},
    userGroup:{type:schema.ObjectId,ref:"UserGroup"},
    vendorName:{type:schema.ObjectId,ref:"Vendor"},
    description:{type:String},
    attachFile:{type:String},
    originalFile:{type:String},
    assignee:{type:String,Required:true},
    occurs:{type:String,Required:true},
    startDate:{type:Date,Required:true},
    activityReminder:{type:Date,Required:true},
    endDate:{type:Date},
    sendEmailTo:[{type:String}],
    markasDone:{type:Boolean,default:false},
    pending:{type:Boolean,default:false},
    remark:{type:String},
})
module.exports=mongoose.model('Schedule',scheduleSchema);