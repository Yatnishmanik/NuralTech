const Joi = require('joi')
const measureUnitModel = require('./unit.model')
const {ObjectId} = require('mongodb')
const measureUnitOperation = {
    createUnit : async function(req, res){
        try {
            const unitSchema = Joi.object({
                unit:Joi.string().required(),
                description: Joi.string(),
                createdBy: Joi.string()
            })
            const { error,value } = unitSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const findUnit = await measureUnitModel.findOne({unit:req.body.unit}).lean()
            if(findUnit !=null){
                res.status(409).json({
                    "statusCode":409,
                    msg:"Already Exist"
                })
            }else{
               const result = await measureUnitModel.create({
                unit:req.body.unit,
                description:req.body.description,
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

    getAllUnit : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await measureUnitModel.find().limit(limit).skip(skip).lean();
            const count = await measureUnitModel.count();
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

    updateUnit : async function(req,res){
        try {
            
            const unitSchema = Joi.object({
                unit:Joi.string().required(),
                description: Joi.string(),
                createdBy: Joi.string()
            })
            const { error,value } = unitSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const findUnit = await measureUnitModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findUnit ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await measureUnitModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                unit:req.body.unit,
                description: req.body.description,
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

    deleteUnit : async function(req,res){
        try {
            const findUnit = await measureUnitModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findUnit ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await measureUnitModel.deleteOne({_id:new ObjectId(req.params.id)})
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

module.exports = measureUnitOperation