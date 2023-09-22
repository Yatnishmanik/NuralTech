const Joi = require('joi')
const taxModel = require('./tax.model')
const {ObjectId} = require('mongodb')
const taxOperation = {
    createtax : async function(req, res){
        try {
            const taxSchema = Joi.object({
                tax_name:Joi.string().required(),
                tax_value:Joi.string().required(),
                tax_group:Joi.string().required()

            })
            const { error,value } = taxSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const findtax = await taxModel.findOne({tax_name:req.body.tax_name}).lean()
            if(findtax !=null){
                res.status(409).json({
                    "statusCode":409,
                    msg:"Already Exist"
                })
            }else{
               const result = await taxModel.create({
                tax_name:req.body.tax_name,
                tax_value:req.body.tax_value,
                tax_group: req.body.tax_group
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
        
    getAlltax : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            let taxPop = {
                path:"tax_group",
                select:{
                    _id:0,
                    tax_group:1
                }
            }
            
            
            const result = await taxModel.find().limit(limit).skip(skip)
            .populate(taxPop)
            .lean();
            const count = await taxModel.count();
            const page = parseInt(req.query.skip) || 1;

            res.status(200).json({
                "statusCode":200,
                "data":result,
                "page":page,
                "limit":limit,
                "totalPages": Math.ceil(count / limit),
                "totalResults": count,
            })
          } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
          }
    },  

    updatetax : async function(req,res){
        try {
            const taxSchema = Joi.object({
                tax_name:Joi.string().required(),
                tax_value:Joi.string().required(),
                tax_group:Joi.string().required()

            })
            const { error,value } = taxSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }
            const findtax = await taxModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findtax ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await taxModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                tax_name:req.body.tax_name,
                tax_value:req.body.tax_value,
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

    deletetax : async function(req,res){
        try {
            const findtax = await taxModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findtax ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await taxModel.deleteOne({_id:new ObjectId(req.params.id)})
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

module.exports = taxOperation