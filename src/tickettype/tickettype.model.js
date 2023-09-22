const mongoose = require('mongoose')
const ticketTypeSchema = mongoose.Schema({
   parentTicketType:{type: String},
   ticketType :{type: String},
   category :[{categoryId: {type: mongoose.Schema.ObjectId, ref:'Category'}}],
   expectedTat: {type: String},
   activityType: [{activityId: {type: mongoose.Schema.ObjectId, ref:'ActivityType'}}],
   ticketTypeDuration: {type: String},
   reason: {type: String},
   role: {type: String},
   reOpened: {type: String},
   otpRequired: {type:Boolean},
   forwardingEmail: {type:Boolean},
    },{timestamps: true})

module.exports = mongoose.model('TicketType',ticketTypeSchema)