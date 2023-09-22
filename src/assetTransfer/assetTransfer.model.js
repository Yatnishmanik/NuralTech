
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const addTranferschema = mongoose.Schema({
  assetInfo:[{type:schema.ObjectId,ref:'Asset'}],
  user:{type:String,default:'rajesh'},
  newlocation:{type:schema.ObjectId,ref:'Location'},
  transferStatus:{type:schema.ObjectId,ref:'Status'},
  allotedupto: {type: Date },
  transferto: {type: String },
  transferCC: [{type: String}],
  remark: {type: String },
  condition:{type:schema.ObjectId,ref:'Condition'},
  uploadfile: { type: String },
});
module.exports = mongoose.model("Transfer", addTranferschema);
