const mongoose = require('mongoose')
const schema = mongoose.Schema

const moveInventorySchema = mongoose.Schema({

    fromStockPointType:{ type: String},
    fromStockPoint:{
        location: {type: schema.ObjectId, ref:'Location'},
        user :{type: String},
        asset:{type: String} 
        },
    toStockPointType:{ type: String},
    toStockPoint:{
        location: {type: schema.ObjectId, ref:'Location'},
        user :{type: String},
        asset:{type: String} 
        },
    movementTypeStatus:{ type: String },
    moveTo:{ type: String },
    remarks:{type: String},
    emailCC:[{email:{type: String}}],
    fileName:{type: String},
    filePath:{type: String},
    item:{type: schema.ObjectId,ref: "ManageItems"},
    moveQuantity:{type:Number}

})


module.exports = mongoose.model('moveInventory', moveInventorySchema)