
const mongoose= require('mongoose')
const imageSchema = mongoose.Schema({
    filename:{type:String},
    originalname:{type:String},
    size:{type:Number}
    
})
module.exports = mongoose.model('uploadImages',imageSchema);