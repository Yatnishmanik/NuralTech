const Joi = require('joi')
const inventoryMovementModel = require('./inventorymovement.model')
const {ObjectId} = require('mongodb')
const InventoryMovementOperation = {
    createInventoryMovement : async function(req, res){
        try {

            const inventoryMovementSchema = Joi.object({
               movementType:Joi.string().required(),
               movementName:Joi.string().required(),
               createdBy:Joi.string().required(),
                
            })
            const { error,value } = inventoryMovementSchema.validate(req.body,{abortEarly:false})
            if(error){
               return res.status(400).json({
                    error:error.details[0].message
               })
            }
            
               const result = await inventoryMovementModel.create({
                  movementType:req.body.movementType,
                  movementName:req.body.movementName,
                  createdBy: req.body.createdBy,
                
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

    getAllInventoryMovement : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;
    
            
            const result = await inventoryMovementModel.find().limit(limit).skip(skip).lean();
            const count = await inventoryMovementModel.count();
            const page = parseInt(req.query.page) || 1;
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

    updateInventoryMovement : async function(req,res){
        try {
            const inventoryMovementSchema = Joi.object({
               movementType:Joi.string().required(),
               movementName:Joi.string().required(),
               createdBy:Joi.string().required(),
            })
            const { error,value } = inventoryMovementSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const findBrand = await inventoryMovementModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findBrand ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await inventoryMovementModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                  movementType:req.body.movementType,
                  movementName:req.body.movementName,
                  createdBy: req.body.createdBy,
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

    deleteInventoryMovement : async function(req,res){
        try {
            const findPurchaseOrder = await inventoryMovementModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findPurchaseOrder ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await inventoryMovementModel.deleteOne({_id:new ObjectId(req.params.id)})
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

module.exports = InventoryMovementOperation