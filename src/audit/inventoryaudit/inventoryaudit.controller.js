const Joi = require('joi')
const inventoryAuditModel = require('./inventoryaudit.model')
const {ObjectId} = require('mongodb')
const manageAuditOperation ={
    createInventoryAudit : async function(req, res){
        try {

            const InventoryAuditSchema = Joi.object({
                auditName:Joi.string().required(),
                assignee: Joi.string().required(),
                location: Joi.required(),
                showBookCount: Joi.boolean(),
                category: Joi.required(),
                startDate: Joi.string().required(),
                endDate: Joi.string().required(),
                manuallyEditPhysicalCount: Joi.boolean(),
                status:Joi.string().required() 

            })
            const { error,value } = InventoryAuditSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            
               const result = await inventoryAuditModel.create({
                auditName:req.body.reason,
                assignee:req.body.assignee,
                location:req.body.location,
                showBookCount:req.body.showBookCount,
                category:req.body.category,
                startDate:req.body.startDate,
                endDate:req.body.endDate,
                manuallyEditPhysicalCount:req.body.manuallyEditPhysicalCount,
                status:req.body.status
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

    getAllInventoryAudit : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await inventoryAuditModel.find().populate("location.locationId","parentLocation").populate("category.categoryId").populate("status").limit(limit).skip(skip).lean();
            const count = await inventoryAuditModel.count();
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

    updateInventoryAudit: async function(req,res){
        try {

           
            const InventoryAuditSchema = Joi.object({
                auditName:Joi.string().required(),
                assignee: Joi.string().required(),
                location: Joi.required(),
                showBookCount: Joi.boolean(),
                category: Joi.required(),
                startDate: Joi.string().required(),
                endDate: Joi.string().required(),
                manuallyEditPhysicalCount: Joi.boolean() ,
                status:Joi.string().required() 

            })
            const { error,value } = InventoryAuditSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }
            
            const findInventoryAudit = await inventoryAuditModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findInventoryAudit ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await inventoryAuditModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                auditName:req.body.reason,
                assignee:req.body.assignee,
                location:req.body.location,
                showBookCount:req.body.showBookCount,
                category:req.body.category,
                startDate:req.body.startDate,
                endDate:req.body.endDate,
                manuallyEditPhysicalCount:req.body.manuallyEditPhysicalCount,
                status:req.body.status
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

    deleteInventoryAudit : async function(req,res){
        try {
            const findInventoryAudit = await inventoryAuditModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findInventoryAudit ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await inventoryAuditModel.deleteOne({_id:new ObjectId(req.params.id)})
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
}

module.exports = manageAuditOperation