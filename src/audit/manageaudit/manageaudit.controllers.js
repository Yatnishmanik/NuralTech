const Joi = require('joi')
const manageAuditModel = require('./manageaudit.model')
const randomNo = require('../../Utils/randomcode')
const {ObjectId} = require('mongodb')
const statusModel = require('../../status/status.model')
const manageAuditOperation ={
    createManageAudit : async function(req, res){
        try {

            const manageAuditSchema = Joi.object({
                auditType:Joi.string(),
                auditName: Joi.string().required(),
                startDate: Joi.string().required(),
                endDate:Joi.string().required(),
                auditForFields:Joi.array(),
                status:Joi.string(),
                parameterCheck:Joi.array(),
                totalVerified:Joi.string(),
                totalAssetsToVerified: Joi.string(),
                verifiedFields: Joi.array(),
                totalExtra: Joi.string(),
                grid:Joi.array(),
                createdBy: Joi.string().required() 
            })
            const { error,value } = manageAuditSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            
               const result = await manageAuditModel.create({
                auditType:req.body.auditType,
                auditName: req.body.auditName,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                auditForFields: req.body.auditForFields,
                status: req.body.status,
                parameterCheck: req.body.parameterCheck,
                totalVerified: req.body.totalVerified,
                totalAssetsToVerified: req.body.totalAssetsToVerified,
                verifiedFields: req.body.verifiedFields,
                totalExtra: req.body.totalExtra,
                grid: req.body.grid,
                auditCode:randomNo,
                createdBy:req.body.createdBy
                })
                res.status(201).json({
                    "statusCode":201,
                    "msg":"created successfully",
                    "data":result
                })
            
        } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
        }
      },

    getAllManageAudit : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await manageAuditModel.find().
            populate("parameterCheck.parameterId")
            .populate("grid.category")
            .populate("grid.location")
            .populate("grid.department")
            .populate("status")
            
            .limit(limit).skip(skip).lean();
            const count = await manageAuditModel.count();
            const page = parseInt(req.query.skip) || 1;
            res.status(200).json({
                "data":result,
                "page":page,
                "limit":limit,
                "totalPages": Math.ceil(count / limit),
                "totalResults": count,
                "statusCode":200,
                
            })
          } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
          }
    },  

    updateManageAudit: async function(req,res){
        try {

            const manageAuditSchema = Joi.object({
                auditType:Joi.string(),
                auditName: Joi.string().required(),
                startDate: Joi.string().required(),
                endDate:Joi.string().required(),
                auditForFields:Joi.array(),
                status:Joi.string(),
                parameterCheck:Joi.array(),
                totalVerified:Joi.string(),
                totalAssetsToVerified: Joi.string(),
                verifiedFields: Joi.array(),
                totalExtra: Joi.string(),
                grid:Joi.array(),
                createdBy: Joi.string().required() 
            })
            const { error,value } = manageAuditSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }
            
            const findManageAudit = await manageAuditModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findManageAudit ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await manageAuditModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                auditType:req.body.auditType,
                auditName: req.body.auditName,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                auditForFields: req.body.auditForFields,
                status: req.body.status,
                parameterCheck: req.body.parameterCheck,
                totalVerified: req.body.totalVerified,
                totalAssetsToVerified: req.body.totalAssetsToVerified,
                verifiedFields: req.body.verifiedFields,
                totalExtra: req.body.totalExtra,
                grid: req.body.grid,
                createdBy:req.body.createdBy
                },{new:true})
                res.status(201).json({
                    "statusCode":201,
                    "msg":"updated successfully",
                    "data":result
                })
            }
        } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
        }
    },

    deleteManageAudit : async function(req,res){
        try {
            const findManageAudit = await manageAuditModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findManageAudit ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await manageAuditModel.deleteOne({_id:new ObjectId(req.params.id)})
                res.status(201).json({
                    "statusCode":201,
                    "msg":"Delete successfully",
                    "data":result
                })
            }
        } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
        }
    },

    pendingAudit: async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const resultStatus = await statusModel.findOne({"statusName":"Pending"},{_id:1}).lean()

            const result = await manageAuditModel.find({status:resultStatus._id}).
            populate("parameterCheck.parameterId")
            .populate("grid.category")
            .populate("grid.location")
            .populate("grid.department")
            .populate("status","statusName")
            
            .limit(limit).skip(skip).lean();
            const count = await manageAuditModel.count();
            const page = parseInt(req.query.skip) || 1;
            res.status(200).json({
                "data":result,
                "page":page,
                "limit":limit,
                "totalPages": Math.ceil(count / limit),
                "totalResults": count,
                "statusCode":200,
                
            })
          } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
          }
    }
}

module.exports = manageAuditOperation