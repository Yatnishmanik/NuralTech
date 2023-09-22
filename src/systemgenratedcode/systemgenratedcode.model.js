const { number, boolean, bool, string } = require('joi');
const mongoose = require('mongoose')
const systemGencodeSchema = mongoose.Schema({
    module: {type: String},
    text2: {type: String},
    text1: {type: String},
    separator:{type:String},
    categoryCode: {type: Boolean}, 
    locationCode: {type: Boolean},
    categoryCode:{type:Boolean},
    includeLocationCode:{type:Boolean},
    changeAssetCode: {type: Boolean},
    forceChangeAssetCode:{type:Boolean},
    runningNumber:{type:Number},
    createdBy: {type: String}
},{timestamps:true})

module.exports = mongoose.model('SystemGenCode',systemGencodeSchema)