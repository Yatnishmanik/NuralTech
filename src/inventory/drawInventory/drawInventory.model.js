const mongoose = require('mongoose')
const schema = mongoose.Schema

const drawInventorySchema = mongoose.Schema({

    StockPointType:{ type: String},
    StockPoint:{
        location: {type: schema.ObjectId, ref:'Location'},
        user :{type: String},
        asset:{type: String} 
        },
    movementTypeStatus:{ type: String },
    drawnDate:{ type: String },
    remarks:{type: String},
    emailCC:[{email:{type: String}}],
    fileName:{type: String},
    filePath:{type: String},
    item:{type: schema.ObjectId,ref: "ManageItems"},
    drawQuantity:{type:Number},
    allotedUsers: {type: String}

},{timestamps: true})


module.exports = mongoose.model('drawInventory', drawInventorySchema)