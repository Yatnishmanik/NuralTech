const Joi = require('joi')
const manageItemsModel = require('./manageitems.model')
const reorderItemLevelModel = require('./reorderitemslevel.model')
const {ObjectId} = require('mongodb')
const randomCode = require('../../Utils/randomcode')
const manageItemsOperation = {
    createManageItems : async function(req, res){
        try {
            const manageItemsSchema = Joi.object({
                item:Joi.string().required(),
                category: Joi.string(),
                unit: Joi.string(),
                itemCode: Joi.string(), 
                hsnCode:Joi.string(),
                averagePrice:Joi.number(),
                description:Joi.string(),
                receivable:Joi.boolean(),
                createdBy:Joi.string()
            })
            const { error,value } = manageItemsSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }
            const findManageItems = await manageItemsModel.findOne({item:req.body.item}).lean()
            if(findManageItems !=null){
                res.status(409).json({
                    "statusCode":409,
                    msg:"Already Exist"
                })
            }else{
              let itemCode =""
              if(req.body.itemCode == null){
                itemCode = "ITM"+randomCode
              }else{
                itemCode = req.body.itemCode
              }
               const result = await manageItemsModel.create({
                item:req.body.item,
                category:req.body.category,
                unit: req.body.unit,
                itemCode:itemCode,
                hsnCode:req.body.hsnCode,
                averagePrice:req.body.averagePrice,
                description:req.body.description,
                // file:req.file.filename,
                // filePath: req.file.path||'',
                receivable:req.body.receivable,
                createdBy: req.body.createdBy
                })
                res.status(201).json({
                    "statusCode":201,
                    "msg":"created successfully",
                    "data":result
                })
             }
        } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
        }
    },

    getAllManageItems : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await manageItemsModel.find().limit(limit).skip(skip).populate('category').populate('unit','unit').lean()
            const count = await manageItemsModel.count();
            res.status(200).json({
                "statusCode":200,
                "data":result,
                "count":count
            })
          } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
          }
    },  


    updateManageItems : async function(req,res){
        
        try {
            
            
            const manageItemsSchema = Joi.object({
                item:Joi.string().required(),
                category: Joi.string(),
                unit: Joi.string(),
                itemCode: Joi.string(), 
                hsnCode:Joi.string(),
                averagePrice:Joi.number(),
                description:Joi.string(),
                receivable:Joi.boolean(),
                createdBy: req.body.createdBy
            })
            const { error,value } = manageItemsSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const findManageItems = await manageItemsModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findManageItems ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{

                let itemCode =""
                if(req.body.itemCode == null){
                  itemCode = "ITM"+randomCode
                }else{
                  itemCode = req.body.itemCode
                }

               const result = await manageItemsModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                item:req.body.item,
                category:req.body.category,
                unit: req.body.unit,
                itemCode:itemCode,
                hsnCode:req.body.hsnCode,
                averagePrice:req.body.averagePrice,
                description:req.body.description,
                // file:req.file.filename,
                // filePath: req.file.path,dd additional security measures like input validation, error handling, and user session management   
                receivable:req.body.receivable,
                createdBy: req.body.createdBy
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

    deleteManageItems : async function(req,res){
        try {
            const findUnit = await manageItemsModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findUnit ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await manageItemsModel.deleteOne({_id:new ObjectId(req.params.id)})
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

    reorderItemLevel: async function(req, res){
        try {
            const reorderItemSchema = Joi.object({
                item:Joi.array().required(),
                location:Joi.array().required(),
                minQuantity:Joi.number().required()
                
            })
            const { error,value } = reorderItemSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const result = await reorderItemLevelModel.create({
                item: req.body.item,
                location: req.body.location,
                minQuantity:req.body.minQuantity
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

    getAllReorderItemLevel: async function (req, res){
        try {
            
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await reorderItemLevelModel.find().limit(limit).skip(skip)
                                 .populate('location.locationId','location')
                                 .populate('item.itemId').lean()
            const count = await reorderItemLevelModel.count();
            res.status(200).json({
                "statusCode":200,
                "data":result,
                "count":count
            })
        } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
        }
    }
}

module.exports = manageItemsOperation