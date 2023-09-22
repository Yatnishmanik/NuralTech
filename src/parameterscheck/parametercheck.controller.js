const Joi = require('joi')
const parameterCheckModels = require('./parametercheck.model')
const {ObjectId} = require('mongodb')
const activityTypeOperation ={
    createParameterCheck : async function(req, res){
        try {
            const parameterCheckSchema = Joi.object({
                parameterCheck:Joi.string().required(),
                
            })
            const { error,value } = parameterCheckSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }
            
            
               const result = await parameterCheckModels.create({
                parameterCheck: req.body.parameterCheck,
                
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

    getAllParameterCheck : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            
            const result = await parameterCheckModels.find().limit(limit).skip(skip).lean();
            const count = await parameterCheckModels.count();
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

    updateParameterCheck : async function(req,res){
        try {

            const parameterCheckSchema = Joi.object({
                parameterCheck:Joi.string().required(),
                
            })
            const { error,value } = parameterCheckSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }
           
            

            const findParameterCheck = await parameterCheckModels.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findParameterCheck ==true){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await parameterCheckModels.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                parameterCheck : req.body.parameterCheck
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

    deleteParameterCheck : async function(req,res){
        try {
            const findPriority = await parameterCheckModels.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findPriority ==true){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await parameterCheckModels.deleteOne({_id:new ObjectId(req.params.id)})
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