const Joi = require('joi')
const purchaseOrderModel = require('./purchaseordersettings.model')
const {ObjectId} = require('mongodb')
const purchaseOrderOperation = {
    createPurchaseOrder : async function(req, res){
        try {

            const purchaseOrderSchema = Joi.object({
                taxSelection:Joi.boolean(),
                allowBackDate:Joi.boolean(),
                allowFutureDate:Joi.boolean(),
                poAuthorized: Joi.boolean(),
                enableDiscount: Joi.boolean(),
                discountBased: Joi.boolean(),
                roundOff: Joi.boolean(),
                defaultPONumber: Joi.number(),
                poHeader: Joi.string(),
                termsCondition: Joi.array(),
                paymentTerms: Joi.array()
            })
            const { error,value } = purchaseOrderSchema.validate(req.body,{abortEarly:false})
            if(error){
               return res.status(400).json({
                    error:error.details[0].message
               })
            }
            
               const result = await purchaseOrderModel.create({
                taxSelection:req.body.taxSelection,
                allowBackDate: req.body.allowBackDate,
                allowFutureDate: req.body.allowFutureDate,
                poAuthorized: req.body.poAuthorized,
                enableDiscount: req.body.enableDiscount,
                discountBased: req.body.discountBased,
                roundOff: req.body.roundOff,
                defaultPONumber: req.body.defaultPONumber,
                poHeader: req.body.poHeader,
                termsCondition: req.body.termsCondition,
                paymentTerms: req.body.paymentTerms
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

    getAllPurchaseOrder : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await purchaseOrderModel.find().limit(limit).skip(skip).lean();
            const count = await purchaseOrderModel.count();
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

    updatePurchaseOrder : async function(req,res){
        try {
            const purchaseOrderSchema = Joi.object({
                taxSelection:Joi.boolean(),
                allowBackDate:Joi.boolean(),
                allowFutureDate:Joi.boolean(),
                poAuthorized: Joi.boolean(),
                enableDiscount: Joi.boolean(),
                discountBased: Joi.boolean(),
                roundOff: Joi.boolean(),
                defaultPONumber: Joi.number(),
                poHeader: Joi.string(),
                termsCondition: Joi.array(),
                paymentTerms: Joi.array()
            })
            const { error,value } = purchaseOrderSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const findBrand = await purchaseOrderModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findBrand ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await purchaseOrderModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                taxSelection:req.body.taxSelection,
                allowBackDate: req.body.allowBackDate,
                allowFutureDate: req.body.allowFutureDate,
                poAuthorized: req.body.poAuthorized,
                enableDiscount: req.body.enableDiscount,
                discountBased: req.body.discountBased,
                roundOff: req.body.roundOff,
                defaultPONumber: req.body.defaultPONumber,
                poHeader: req.body.poHeader,
                termsCondition: req.body.termsCondition,
                paymentTerms: req.body.paymentTerms
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

    deletePurchaseOrder : async function(req,res){
        try {
            const findPurchaseOrder = await purchaseOrderModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findPurchaseOrder ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await purchaseOrderModel.deleteOne({_id:new ObjectId(req.params.id)})
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

module.exports = purchaseOrderOperation