const Joi = require('joi')
const priorityModels = require('./priority.model')
const {ObjectId} = require('mongodb')
const priorityOperation ={
    createPriority : async function(req, res){
        try {
            const prioritySchema = Joi.object({
                priority:Joi.string().required(),
                assetCategories:Joi.string().required(),
                assetLocations: Joi.string().required(),
                showSelectedDefault: Joi.boolean().required()
            })
            const { error,value } = prioritySchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }
            const {priority,assetCategories,assetLocations,showSelectedDefault} = req.body
            // const findPriority = await priorityModels.findOne({meter:req.body.meter}).lean()
            // if(findPriority !=null){
            //     res.status(409).json({
            //         "statusCode":409,
            //         msg:"Already Exist"
            //     })
            // }else{
               const result = await priorityModels.create({
                priority:priority,
                assetCategories:assetCategories,
                assetLocations:assetLocations,
                showSelectedDefault:showSelectedDefault
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

    getAllPriority : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await priorityModels.find().limit(limit).skip(skip).lean();
            const count = await priorityModels.count();
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

    updatePriority : async function(req,res){
        try {

            const prioritySchema = Joi.object({
                priority:Joi.string().required(),
                assetCategories:Joi.string().required(),
                assetLocations: Joi.string().required(),
                showSelectedDefault: Joi.boolean().required()
            })
            const { error,value } = prioritySchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }
            const {priority,assetCategories,assetLocations,showSelectedDefault} = req.body

            const findPriority = await priorityModels.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findPriority ==true){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await priorityModels.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                 priority:priority,
                assetCategories:assetCategories,
                assetLocations:assetLocations,
                showSelectedDefault:showSelectedDefault
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

    deletePriority : async function(req,res){
        try {
            const findPriority = await priorityModels.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findPriority ==true){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await priorityModels.deleteOne({_id:new ObjectId(req.params.id)})
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

module.exports = priorityOperation