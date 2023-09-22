const mongoose = require('mongoose')
const schema = mongoose.Schema;

const manageItemsSchema = mongoose.Schema({ 
    

    /**
     * this schema is add inventory
     */


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
    },

    /**
     * this schema is move inventory
     */


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
    moveQuantity:{type:Number},

    /**
     * this schema is draw inventory
     */

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


module.exports = mongoose.model('Inventory',manageItemsSchema)