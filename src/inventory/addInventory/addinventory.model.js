const mongoose = require('mongoose')
const schema = mongoose.Schema

const addInventorySchema = mongoose.Schema({
  vendor: {type: schema.ObjectId,ref:"Vendor"},
  mode: {type: String},
  stockPointType: { type: String},
  stockPoint: {
    location: {type: schema.ObjectId, ref:'Location'},
    user :{type: String},
    asset:{type: String} 
    },
  moveTo: { type: String },
  additionalDate: { type: String},
  remarks: {type: String},
  emailCC: [{email:{type: String}}],
  fileName :{type: String},
  filePath:{type: String},
  item:{type: schema.ObjectId,ref: "ManageItems"},
  batchNo:{type: String},
  batchDate: {type: String},
  rate :{type: Number},
  quantity :{type: Number},
  assetId :{
    type: schema.ObjectId,
    ref:"addAssetschema"
  }


})


module.exports = mongoose.model('AddInventory', addInventorySchema)