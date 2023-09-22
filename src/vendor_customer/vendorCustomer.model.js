const mongoose = require('mongoose')
const schema = mongoose.Schema;

const vendorSchema = mongoose.Schema({

 vendorCode: {type: String},   
 vendor_name: {type:String },
 email : {type: String},
 contactName : {type: String},
 contactPerson : {type: String},
 contactNumber :{type: Number},
 customer :{type: Boolean, default:false},
 address1 :{type: String},
 address2 :{type: String},
 city : {type: String},
 state: {type: String},
 postalCode :{type: String},
 country:{type:String},
 govtRegistration1: {type: String},
 govtRegistration2 :{type: String},
 govtRegistration3 :{type: String},
 notes :{type: String},
 createUserVendor:{type:Boolean, default:false},
 showTicketReported :{type: Boolean, default :false},
 location : {type: schema.ObjectId,
    ref: "Location", }, 
 createdBy :{type: String}

},{timestamps:true})

module.exports = mongoose.model('Vendor',vendorSchema)