const { default: mongoose } = require('mongoose');
const descriptionModel=mongoose.Schema({
    description:{type:String,Required:true},
    remarks:{type:String},
    quantity:{type:Number,Required:true},
    unit:{type:Number},
    rate:{type:Number,Required:true},
    discount:{type:Number},
    taxtype:{type:String},
})
const serviceOrdersetting = mongoose.Schema({
    request:{type:String},
    serviceOrder:{type:String},
    vendor:{type:String,Required:true},
    deliveryDate:{type:Date,Required:true},
    deliveryLocation:{type:String,Required:true},
    serviceOrderDate:{type:Date,Required:true},
    paymentTerms:{type:String,Required:true},
    orderFileUploadPath:{type:String,Required:true},
    amountsInwords:{type:String},
    serviceCC:{type:String},
    authorizedSignature:{type:String},
    additionInfoUploadPath:{type:String},
    sendEmail:{type:Boolean},
    items:[descriptionModel]
})
module.exports = mongoose.model('serviceOrderForm',serviceOrdersetting);
