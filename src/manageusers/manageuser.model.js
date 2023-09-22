const mongoose = require('mongoose')
const schema = mongoose.Schema;

const manageUserSchema = mongoose.Schema({
  fullName :{type: String},
  role :{type: String},
  contactNumber :{type: Number},
  department:{ type: schema.ObjectId,
    ref: "Department" },
  language:{type: String},
  trackUserLocation :{type:Boolean,default:false},
  timeZone :{type: String},
  emailAddress: {type: String},
  reportingManager :{type: String},
  location :  {type: schema.ObjectId,
    ref: "Location" },
  singleSignOnUsername :{type: String},
  defaultScreen :{type: String},
  createdBy :{type: String},
  modifiedBy :{type: String},
  lastAccessOn :{type: String}     
},{timestamps: true})

module.exports = mongoose.model('ManageUser',manageUserSchema)