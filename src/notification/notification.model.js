const mongoose = require('mongoose')
const schema = mongoose.Schema;

const notificationmodel = mongoose.Schema({
    message:String,
    user:{type:schema.ObjectId,ref:'user'},
    seen :{type: Boolean, default:true},
    
},{timestamps:true})

module.exports = mongoose.model('Notification',notificationmodel);