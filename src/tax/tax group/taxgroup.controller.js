const taxgroupModel = require('./taxgroup.model')
const Joi = require('joi')
const {ObjectId} = require('mongodb')
const taxOpreation = {
    createtaxgroup : async function(req, res){
        try {

            const taxSchema = Joi.object({
                tax_group:Joi.string().required(),

            })
            const { error,value } = taxSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const findtaxgroup = await taxgroupModel.findOne({tax_group:req.body.tax_group}).lean()

            if(findtaxgroup !=null){
                res.status(409).json({
                    "statusCode":409,
                    msg:"Already Exist"
                })
            }else{
               const result = await taxgroupModel.create({
                tax_group:req.body.tax_group,
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

    getAlltaxgroup : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await taxgroupModel.find().limit(limit).skip(skip).lean();
            const count = await taxgroupModel.count();
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

    updatetaxgroup : async function(req,res){
        try {

            const taxSchema = Joi.object({
                tax_group:Joi.string().required(),

            })
            const { error,value } = taxSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }
            
            const findtaxgroup = await taxgroupModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findtaxgroup ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await taxgroupModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                tax_group:req.body.tax_group,
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

    deletetaxgroup : async function(req,res){
        try {
            const findtaxgroup = await taxgroupModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findtaxgroup ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await taxgroupModel.deleteOne({_id:new ObjectId(req.params.id)})
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

module.exports = taxOpreation