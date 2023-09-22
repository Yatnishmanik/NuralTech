const Joi = require('joi')
const activityTypeModels = require('./activitytype.model')
const {ObjectId} = require('mongodb')
const activityTypeOperation ={
    createActivityType : async function(req, res){
        try {
            const activityTypeSchema = Joi.object({
                activityType:Joi.string().required(),
                amountToBe:Joi.string().required(),
                fileUpload: Joi.boolean().required(),
                smsNotification: Joi.boolean().required(),
                otpRequired: Joi.boolean().required(),
                createdBy: Joi.string().required()
            })
            const { error,value } = activityTypeSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }
            const {activityType, amountToBe, fileUpload ,smsNotification, otpRequired, createdBy } = req.body
            
               const result = await activityTypeModels.create({
                activityType: activityType,
                amountToBe: amountToBe,
                fileUpload: fileUpload,
                smsNotification: smsNotification,
                otpRequired: otpRequired,
                createdBy: createdBy
                })
                res.status(201).json({
                    "statusCode":201,
                    "msg":"created successfully",
                    "data":result
                })
            //}
        } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
        }
      },

    getAllActivityType : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            
            const result = await activityTypeModels.find().limit(limit).skip(skip).lean();
            const count = await activityTypeModels.count();
            const page = parseInt(req.query.page) || 1;
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

    updateActivityType : async function(req,res){
        try {

            const activityTypeSchema = Joi.object({
                activityType: Joi.string().required(),
                amountToBe: Joi.string().required(),
                fileUpload: Joi.boolean().required(),
                smsNotification: Joi.boolean().required(),
                otpRequired: Joi.boolean().required(),
                createdBy: Joi.string().required()
            })
            const { error,value } = activityTypeSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }
            const {activityType, amountToBe, fileUpload ,smsNotification, otpRequired, createdBy } = req.body
            

            const findPriority = await activityTypeModels.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findPriority ==true){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await activityTypeModels.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                activityType: activityType,
                amountToBe: amountToBe,
                fileUpload: fileUpload,
                smsNotification: smsNotification,
                otpRequired: otpRequired,
                createdBy: createdBy
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

    deleteActivityType : async function(req,res){
        try {
            const findPriority = await activityTypeModels.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findPriority ==true){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await activityTypeModels.deleteOne({_id:new ObjectId(req.params.id)})
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

module.exports = activityTypeOperation