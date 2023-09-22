const Joi = require('joi')
const addInventoryModel = require('./addinventory.model')
const {ObjectId} = require('mongodb')

const addInventoryOperation = {
    createAddInventory : async function(req, res){
        try {
            const addInventorySchema = Joi.object({
                vendor: Joi.string(),
                mode: Joi.string().required(),
                stockPointType: Joi.string().required(),
                stockPoint: Joi.required(),
                moveTo: Joi.string(),
                additionalDate: Joi.string(),
                remarks: Joi.string(),
                emailCC: Joi.array(),
                item:Joi.string(),
                batchNo: Joi.string(),
                batchDate: Joi.string(),
                rate: Joi.number().required(),
                quantity: Joi.number().required(),
                assetId: Joi.string()
            })
            const { error,value } = addInventorySchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            
               
            
               const result = await addInventoryModel.create({
                vendor:req.body.vendor,
                mode:req.body.mode,
                stockPointType: req.body.stockPointType,
                stockPoint:req.body.stockPoint,
                moveTo:req.body.moveTo,
                additionalDate:req.body.additionalDate,
                remarks:req.body.remarks,
                emailCC:req.body.emailCC,
                // fileName:req.file.filename,
                // filePath:req.file.path,
                item: req.body.item,
                batchNo:req.body.batchNo,
                batchDate: req.body.batchDate,
                rate: req.body.rate,
                quantity: req.body.quantity,
                assetId: req.body.assetId
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

    getAllAddInventory : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await addInventoryModel.find().limit(limit).skip(skip).
                                 populate('stockPoint.location')
                                 .populate('vendor','vendor_name')
                                 .populate('item','item')
                                 .lean()
            const count = await addInventoryModel.count();
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


    updateAddInventory : async function(req,res){
        
        try {
            
            
            const addInventorySchema = Joi.object({
                vendor: Joi.string(),
                mode: Joi.string().required(),
                stockPointType: Joi.string().required(),
                stockPoint: Joi.required(),
                moveTo: Joi.string(),
                additionalDate: Joi.string(),
                remarks: Joi.string(),
                emailCC: Joi.array(),
                item:Joi.string(),
                batchNo: Joi.string(),
                batchDate: Joi.string(),
                rate: Joi.number().required(),
                quantity: Joi.number().required(),
                assetId: Joi.string()
            })
            const { error,value } = addInventorySchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const findAddInventory = await addInventoryModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findAddInventory ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{

               

               const result = await addInventoryModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                vendor:req.body.vendor,
                mode:req.body.mode,
                stockPointType: req.body.stockPointType,
                stockPoint:req.body.stockPoint,
                moveTo:req.body.moveTo,
                additionalDate:req.body.additionalDate,
                remarks:req.body.remarks,
                emailCC:req.body.emailCC,
                // fileName:req.file.filename,
                // filePath:req.file.path,
                // item: req.body.item,
                batchNo:req.body.batchNo,
                batchDate: req.body.batchDate,
                rate: req.body.rate,
                quantity: req.body.quantity,
                assetId: req.body.assetId
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

    deleteAddInventory : async function(req,res){
        try {
            const findAddInventory = await addInventoryModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findAddInventory ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await addInventoryModel.deleteOne({_id:new ObjectId(req.params.id)})
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

    inventoryDetails: async function (req, res) {
        try {
       const result = await addInventoryModel.aggregate([
                {
                $lookup:{
                    from:"manageitems",
                    localField:"item",
                    foreignField:"_id",
                    as:"ItemsDetails"
                  }
                  
              },
              {
                $unwind:"$ItemsDetails"
              }
        ])
        res.status(200).json({
            "statusCode":201,
            "msg":"Delete successfully",
            "data":result
        })
        
        } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
        }
    }
}

module.exports = addInventoryOperation