const mongoose = require('mongoose')
const activityTypeSchema = mongoose.Schema({
   activityType: { type: String},
   amountToBe: { type: String},
   fileUpload: { type:Boolean},
   smsNotification: { type: Boolean},
   otpRequired: { type: Boolean},
   createdBy: { type: String},
   createdDate: { type: String, default: new Date().toISOString() },
})

module.exports = mongoose.model('ActivityType',activityTypeSchema)