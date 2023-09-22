const mongoose = require('mongoose')
const schema = mongoose.Schema;
const scheduleReportOperation = mongoose.Schema({


    selectReport :{type: String},
    sendEmailTo: {type: String},
    filter: {type: String},
    activityType: { type: schema.ObjectId,ref:'ActivityType'},
    ticketType: { type: schema.ObjectId,ref:'TicketType'},
    userGroup :{type: schema.ObjectId,ref:'UserGroup'},
    assetLocation: [{locationId: {type: mongoose.Schema.ObjectId, ref:'Location'}}],
    emailFrequency:{type: String},
    day: {type: Number},
    scheduleDataRange: {type: String},
    sendEmailsTo :[{email:{type: String}}],
},{timestamps:true})

module.exports = mongoose.model('ScheduleReport',scheduleReportOperation)