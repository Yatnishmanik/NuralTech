const mongoose = require('mongoose');
const schema = mongoose.Schema

const reOrderSchema = mongoose.Schema({

// item:[{items:[{itemId:{type.mongoose.Schema.ObjectId,ref:'addAssetschema'}}]}],
// assetLocation:[{assetLocation:[{locationId:{type:mongoose.Schema.ObjectId,ref:'Location'}}],
// itemCode:{},
// hsnCode:{},
// unitName:{},
// Quantity:{type: Number}

},{timestamps:true})



module.exports = mongoose.model('ReOrder',reOrderSchema)