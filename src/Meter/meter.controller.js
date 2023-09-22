const meterModel = require('./meter.model')
const Joi = require('joi');
const {ObjectId} = require('mongodb')
const meterOperation = {
    createMeter : async function(req, res){
        try {
            const meterSchema = Joi.object({
                meter:Joi.string().required(),
            })
            const { error,value } = meterSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const findMeter = await meterModel.findOne({meter:req.body.meter}).lean()
            if(findMeter !=null){
                res.status(409).json({
                    "statusCode":409,
                    msg:"Already Exist"
                })
            }else{
               const result = await meterModel.create({
                meter:req.body.meter,
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

    getAllMeter : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await meterModel.find().limit(limit).skip(skip).lean();
            const count = await meterModel.count();
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

    updateMeter : async function(req,res){
        try {

            const meterSchema = Joi.object({
                meter:Joi.string().required(),
            })
            const { error,value } = meterSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const findMeter = await meterModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findMeter ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await meterModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                meter:req.body.meter,
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

    deleteMeter : async function(req,res){
        try {
            const findMeter = await meterModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findMeter ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await meterModel.deleteOne({_id:new ObjectId(req.params.id)})
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

module.exports = meterOperation