const mongoose = require('mongoose')
const schema = mongoose.Schema;

const recordItemSchema = mongoose.Schema({
  location:[{"locationId":{type: mongoose.Schema.ObjectId, ref:"Location"}}],
  minQuantity:{type: Number},
  item:[{"itemId":{type:mongoose.Schema.ObjectId, ref:"ManageItems"}}]
},{timestamps: true})

module.exports = mongoose.model('ReorderItemsLevel', recordItemSchema)