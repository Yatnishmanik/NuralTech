const Joi = require('joi')
const drawInventoryModel = require('./drawInventory.model')
const {ObjectId} = require('mongodb')

const drawInventoryOperation = {
    createDrawInventory : async function(req, res){
        try {
            const drawInventorySchema = Joi.object({
                StockPointType:Joi.string().required(),
                StockPoint:Joi.required(),
                movementTypeStatus: Joi.string().required(),
                drawnDate: Joi.required(),
                movementTypeStatus:Joi.string().required(),
                remarks: Joi.string(),
                emailCC: Joi.array(),
                item:Joi.string(),
                drawQuantity: Joi.number().required(),
                allotedUsers: Joi.string()
            })
            const { error,value } = drawInventorySchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            
               
            
               const result = await drawInventoryModel.create({
                StockPointType:req.body.StockPointType,
                StockPoint:req.body.StockPoint,
                movementTypeStatus: req.body.movementTypeStatus,
                drawnDate: req.body.drawnDate,
                movementTypeStatus:req.body.movementTypeStatus,
                remarks: req.body.remarks,
                emailCC: req.body.emailCC,
                item: req.body.item,
                drawQuantity: req.body.drawQuantity,
                // file:req.file.path,
                // filename: req.file.filename,
                file:req.file.path,
                filename: req.file.filename,
                allotedUsers: req.body.allotedUsers
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

    getAllDrawInventory : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await drawInventoryModel.find().limit(limit).skip(skip).
                                 populate('StockPoint.location')
                                 .populate('item','item')
                                 .lean()
            const count = await drawInventoryModel.count();
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


    updateDrawInventory : async function(req,res){
        
        try {
            
            
            const drawInventorySchema = Joi.object({
                StockPointType:Joi.string().required(),
                StockPoint:Joi.required(),
                movementTypeStatus: Joi.string().required(),
                drawnDate: Joi.required(),
                movementTypeStatus:Joi.string().required(),
                remarks: Joi.string(),
                emailCC: Joi.array(),
                item:Joi.string(),
                drawQuantity: Joi.number().required(),
                allotedUsers: Joi.string()
            })
            const { error,value } = drawInventorySchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const findDrawIventory = await drawInventoryModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findDrawIventory ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{

               

               const result = await drawInventoryModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                StockPointType:req.body.StockPointType,
                StockPoint:req.body.StockPoint,
                movementTypeStatus: req.body.movementTypeStatus,
                drawnDate: req.body.drawnDate,
                movementTypeStatus:req.body.movementTypeStatus,
                remarks: req.body.remarks,
                emailCC: req.body.emailCC,
                item: req.body.item,
                drawQuantity: req.body.drawQuantity,
                // file:req.file.path,
                // filename: req.file.filename
                file:req.file.path,
                filename: req.file.filename,
                allotedUsers: req.body.allotedUsers
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

    deleteDrawInventory : async function(req,res){
        try {
            const findDrawInventory = await drawInventoryModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findDrawInventory ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await drawInventoryModel.deleteOne({_id:new ObjectId(req.params.id)})
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

module.exports = drawInventoryOperation