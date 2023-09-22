const Joi = require('joi')
const reasonModel = require('./reason.model')
const {ObjectId} = require('mongodb')
const reasonOperation ={
    createReason : async function(req, res){
        try {

            const reasonSchema = Joi.object({
                reason:Joi.string().required(),
                createdBy: Joi.string().required() 
            })
            const { error,value } = reasonSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            
               const result = await reasonModel.create({
                reason:req.body.reason,
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

    getAllReason : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await reasonModel.find().limit(limit).skip(skip).lean();
            const count = await reasonModel.count();
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

    updateReason: async function(req,res){
        try {

            const reasonSchema = Joi.object({
                reason:Joi.string().required(),
                createdBy: Joi.string().required()

            })
            const { error,value } = reasonSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }
            
            const findReason = await reasonModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findReason ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await reasonModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                reason:req.body.reason
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

    deleteReason : async function(req,res){
        try {
            const findReason = await reasonModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findReason ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await reasonModel.deleteOne({_id:new ObjectId(req.params.id)})
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

module.exports = reasonOperation