const mongoose = require('mongoose')
const purchaseOrderSettingSchema = mongoose.Schema({
   taxSelection :{type:Boolean,default:false},
   allowBackDate :{type:Boolean, default:false},
   allowFutureDate: {type:Boolean,default:false},
   poAuthorized: {type:Boolean, default:false},
   enableDiscount: {type:Boolean, default:false},
   discountBased: {type: Boolean,default: false},
   roundOff: {type: Boolean, default:false},
   defaultPONumber: {type:Number},
   poHeader: {type:String},
   termsCondition: [{type:String}],
   paymentTerms: [{type: String}]
},{timestamps:true})

module.exports = mongoose.model('PurchaseOrderSetting',purchaseOrderSettingSchema)