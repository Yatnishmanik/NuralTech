const mongoose = require('mongoose')
const schema = mongoose.Schema

const inventoryReportSchema = mongoose.Schema({
  location:[{assetLocation:[{locationId:{type:mongoose.Schema.ObjectId,ref:'Location'}}]}],
  category:[{asset:[{assetId:{type:mongoose.Schema.ObjectId,ref:'addAssetschema'}}]}],
  asset:[{asset:[{assetId:{type:mongoose.Schema.ObjectId,ref:'addAssetschema'}}]}],
  allotedUser:{type:String}
})

module.exports = mongoose.model('InventoryReport', inventoryReportSchema)