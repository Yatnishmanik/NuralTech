const mongoose=require('mongoose');
const schema = mongoose.Schema;

const discardschema=mongoose.Schema({
    assetInfo:[{
      assetId:{
        type:schema.ObjectId,
        ref:"Asset"
      },
      soldValue:String,
      wdv:Number,
      remark:String,
    }],
    reason:{type:String,Requied:true},
    discardate:{type:Date,Requied:true},
    vendorname:{
      type:schema.ObjectId,
      ref:"Vendor"
    },
    remark:String,
    taxGroup:{
      type:schema.ObjectId,
      ref:"Taxgroup"
    },
    uploadfile:String,
    originalfile:String,
})

module.exports=mongoose.model('Discard',discardschema);