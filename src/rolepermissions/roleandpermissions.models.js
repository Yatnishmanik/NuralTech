const mongoose = require('mongoose')
const Schema = mongoose.Schema
const rolePermissionsSchema = mongoose.Schema({
  
    roleName: {type: String},
    description: {type: String},
    roleType: {type:String},
    category: [{categoryId: {type: mongoose.Schema.ObjectId, ref:'Category'}}],
    assetLocations :[{assetLocationId:{type: mongoose.Schema.ObjectId, ref:'Location'}}],
    status :[{statusId: {type: mongoose.Schema.ObjectId, ref:'Status'}}],
    permission:{type: String},
    allowInRoleVendor :{type: Boolean, default: false},
    showallottedAssets:{type:Boolean, default: false},
    defaultScreen :{type: String}

},{timestamps:true})

module.exports = mongoose.model('RolePermission',rolePermissionsSchema)