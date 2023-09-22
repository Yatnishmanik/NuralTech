const mongoose = require('mongoose')
const schema = mongoose.Schema;

const manageItemsSchema = mongoose.Schema({ 
    item : {type: String},
    category: {
        type: schema.ObjectId,
        ref: "Category", 
    },
    unit : {
        type: schema.ObjectId,
        ref: "MeasureUnit", 
    },
    itemCode :{type: String},
    hsnCode : {type: String},
    averagePrice :{type: Number},
    description: {type: String},
    file :{type: String},
    filePath: {type: String},
    receivable : {type: Boolean, default: false}

},{timestamps: true})

module.exports = mongoose.model('ManageItems', manageItemsSchema)