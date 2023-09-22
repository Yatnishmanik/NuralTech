const mongoose = require('mongoose')
const schema = mongoose.Schema;
const userGroupSchema =mongoose.Schema({

    groupName: {type: String},
    groupUser: [{email:{type: String}}],
    userGroupHead: {type: String},
    userGroupType :{type: String},
    assetLocations:[{assetLocationId: {type: mongoose.Schema.ObjectId, ref:'Location'}}],
    ticketTypes:[{ticketId: {type: mongoose.Schema.ObjectId, ref:'TicketType'}}],
    role:[{roleName:{type:String}}],
    defaultAssignee:{type: String},
    additionalcc:{type: String},
    assetCategories:[{categoryId: {type: mongoose.Schema.ObjectId, ref:'Category'}}],
    description:{type: String},
    location:{
        type: schema.ObjectId,
        ref: "Location", 
    },
    ticketType:{
        type: schema.ObjectId,
        ref: "TicketType", 
    },
    priority:{
        type: schema.ObjectId,
        ref: "Priority", 
    },
},{timestamps:true})

module.exports = mongoose.model('UserGroup',userGroupSchema)