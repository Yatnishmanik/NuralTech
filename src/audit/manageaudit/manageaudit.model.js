const mongoose = require('mongoose')
const schema = mongoose.Schema

const manageAuditSchema = mongoose.Schema({

    auditType:{type: String},
    auditName:{type: String},
    startDate: {type: String},
    endDate: {type: String},
    auditForFields: [{type: String}],
    grid:[{
        category:{
            type:schema.ObjectId,
            ref: "Category"
        },
        location:{
            type:schema.ObjectId,
            ref:"Location",
        },
        department:{
            type: schema.ObjectId,
            ref:"Department"
        },

        auditUser:{type: String},
        reVerifierName:{type: String}
    }],
    status:{type: schema.ObjectId,
        ref:"Status"},
    parameterCheck:[{parameterId: {type: mongoose.Schema.ObjectId, ref:'ParameterCheck'}}],
    auditCode:{type:String},
    totalVerified:{type:String, default:0},
    totalAssetsToVerified:{type: String, default:0},
    verifiedFields:[{type:String}],
    totalExtra:{type: String, default:0},
     
},{timestamps:true})

module.exports = mongoose.model('ManageAudit',manageAuditSchema)