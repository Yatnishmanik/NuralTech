const Joi = require('joi')
const moveInventoryModel = require('./moveInventory.model')
const addInventoryModel = require('../addInventory/addinventory.model')
const {ObjectId} = require('mongodb')

const addInventoryOperation = {
    createMoveInventory : async function(req, res){
        try {
            const moveInventorySchema = Joi.object({
                fromStockPointType:Joi.string().required(),
                fromStockPoint:Joi.required(),
                toStockPointType: Joi.string().required(),
                toStockPoint: Joi.required(),
                movementTypeStatus:Joi.string().required(),
                moveTo: Joi.string(),
                remarks: Joi.string(),
                emailCC: Joi.array(),
                item:Joi.string(),
                moveQuantity: Joi.number().required()
            })
            const { error,value } = moveInventorySchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            
               
            
               const result = await moveInventoryModel.create({
                fromStockPointType:req.body.fromStockPointType,
                fromStockPoint:req.body.fromStockPoint,
                toStockPointType: req.body.toStockPointType,
                toStockPoint:req.body.toStockPoint,
                movementTypeStatus:req.body.movementTypeStatus,
                moveTo:req.body.moveTo,
                remarks:req.body.remarks,
                emailCC:req.body.emailCC,
                // fileName:req.file.filename,
                // filePath:req.file.path,   
                item: req.body.item,
                moveQuantity: req.body.moveQuantity
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

    getAllMoveInventory : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await moveInventoryModel.find().limit(limit).skip(skip).
                                 populate('fromStockPoint.location')
                                 .populate('toStockPoint.location')
                                 .populate('item','item')
                                 .lean()
            const count = await moveInventoryModel.count();
            const page = parseInt(req.query.skip) || 1;
            res.status(200).json({
                "data":result,
                "page":page,
                "limit":limit,
                "totalPages": Math.ceil(count/ limit),
                "totalResults": count,
                "statusCode":200,
            })
          } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
          }
    },  


    updateMoveInventory : async function(req,res){
        
        try {
            
            
            const moveInventorySchema = Joi.object({
                fromStockPointType:Joi.string().required(),
                fromStockPoint:Joi.required(),
                toStockPointType: Joi.string().required(),
                toStockPoint: Joi.required(),
                movementTypeStatus:Joi.string().required(),
                moveTo: Joi.string(),
                remarks: Joi.string(),
                emailCC: Joi.array(),
                item:Joi.string(),
                moveQuantity: Joi.number().required()
            })
            const { error,value } = moveInventorySchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const findMoveInventory = await moveInventoryModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findMoveInventory ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{

               

               const result = await moveInventoryModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                fromStockPointType:req.body.fromStockPointType,
                fromStockPoint:req.body.fromStockPoint,
                toStockPointType: req.body.toStockPointType,
                toStockPoint:req.body.toStockPoint,
                movementTypeStatus:req.body.movementTypeStatus,
                moveTo:req.body.moveTo,
                remarks:req.body.remarks,
                emailCC:req.body.emailCC,
                // fileName:req.file.filename,
                // filePath:req.file.path,
                item: req.body.item,
                moveQuantity: req.body.moveQuantity
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

    deleteMoveInventory : async function(req,res){
        try {
            const findMoveInventory = await moveInventoryModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findMoveInventory ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await moveInventoryModel.deleteOne({_id:new ObjectId(req.params.id)})
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

module.exports = addInventoryOperation