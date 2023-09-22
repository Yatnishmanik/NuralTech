const modelModels = require('./model.model')
const {ObjectId} = require('mongodb')
const modelOperation = {
    createModel : async function(req, res){
        try {
            const findModel = await modelModels.findOne({model_name:req.body.model_name}).lean()
            if(findModel !=null){
                res.status(409).json({
                    "statusCode":409,
                    msg:"Already Exist"
                })
            }else{
               const result = await modelModels.create({
                model_name:req.body.model_name,
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

    getAllModel : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await modelModels.find().limit(limit).skip(skip).lean();
            const count = await modelModels.count();
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

    updateModel : async function(req,res){
        try {
            const findModel = await modelModels.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findModel ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await modelModels.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                model_name:req.body.model_name,
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

    deleteModel : async function(req,res){
        try {
            const findModel = await modelModels.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findModel ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await modelModels.deleteOne({_id:new ObjectId(req.params.id)})
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

module.exports = modelOperation