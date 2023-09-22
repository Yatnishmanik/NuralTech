const mongoose = require('mongoose')
const schema = mongoose.Schema;

const categorySchema = mongoose.Schema({
    parentCategory:{ type: schema.ObjectId,ref:"Category"},
    categoryName:{type: String},
    categoryCode:{type:String},
    usersType:{type: String},

    cascade: {type:Boolean, default:false},
    allowAutoExtend: {type:Boolean, default:false},
    endLife:{endLifeValue:{type:String},keys:{type:String}},
    scrapValue:{scrap:{type:String},keys:{type:String}}, 
    depreciation:{type: Number},
    incomeTaxDepreciation:{type: Number},
    
    details:[{
        assigneeBasedOn:{type:String},
        assigneeRole:{type:String},
        assignee:{type:String},
        occurs:{type:String},
        activityType:{  type: schema.ObjectId,ref:"ActivityType"},
        startScheduleAfter:{type:Number},
        activityReminders:{type:String},
        scheduleBasedOn:{type: String},
        customDays:{type: Number},

    }],

    defaultVendor:{type: schema.ObjectId,ref:"Vendor"},
    autoAssign: {type:Boolean, default:false}

},{timestamps:true})

module.exports = mongoose.model('Category',categorySchema)