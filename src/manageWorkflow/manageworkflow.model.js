const mongoose  = require("mongoose");
const workFlow=mongoose.Schema({
    control:{type:String},
    value:{type:String}
})
const workflowLevel=mongoose.Schema({
    approvalBasedon:{type:String},
    approval:{type:String},
    userType:{type:String},
    locationCustom:{type:String},
    reportingLevel:{type:String},
    defaultTransfer:{type:String},
    sendreminderNumber:{type:Number},
    escalateTonextLevel:{type:Number},
    Description:{type:String},
    canModifiedfield:[{type:String}],
    approvalRequired:{type:Boolean},
    closedWorkflow:{type:Boolean},
    additionalRole:[{type:String}],
    additionalUser:[{type:String}]
})
const manageworkflow =mongoose.Schema({
    role:[{type:String,Required:true}],
    workFlowname:{type:String},
    form:{type:String,Required:true},
    workFlow:[workFlow],
    workflowLevel:[workflowLevel],
});
module.exports = mongoose.model('manageworkflow',manageworkflow);