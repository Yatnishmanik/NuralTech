const Joi= require('joi');
const { ObjectId } = require('mongodb')
const serviceRequestModel= require('./service.model');

const controller={

    // ----------------CreateService------------------//
    async createService(req,res){
        try {
            const manageschema = Joi.object({
                requestType:Joi.string(),
                requestOn:Joi.date(),
                location:Joi.string(),
                requestId:Joi.string(),
                description:Joi.string(),
                requiredDate:Joi.date(),
                uploadDate:Joi.date(),
                
            });
            const { error } = manageschema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    error: error.details[0].message
                })
            }
            console.log(req.file);
            console.log(req.body);
            const {requestType,requestOn,location,requestId,description,requiredDate,uploadDate,}=req.body;
            const data = new serviceRequestModel({
                requestType:requestType,
                requestOn:requestOn,
                location:location,
                requestId:requestId,
                description:description,
                requiredDate:requiredDate,
                uploadDate:uploadDate,
                uploadFilePath:req.file.path,
            });
            console.log(data)
            const result = await data.save();
            res.status(201).json({
                statusCode: 201,
                msg: "successfully created",
                data: result
            })
        }
        catch (error) {
            res.status(500).json({ statusCode: 500, error: error.message });
        }
    },


    // ---------------- GetData--------------------//
    async getService(req,res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;
            const result = await serviceRequestModel.find();
            const count = await serviceRequestModel.count();
            const page = parseInt(req.query.skip) || 1;
            console.log(result);
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

    // -------------------Update--------------------//
    
    async updateService(req,res){
        try {
            const manageschema = Joi.object({
                requestType:Joi.string(),
                requestOn:Joi.date(),
                location:Joi.string(),
                requestId:Joi.string(),
                description:Joi.string(),
                requiredDate:Joi.date(),
                uploadDate:Joi.date(),
                
            });
            const { error } = manageschema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    error: error.details[0].message
                })
            }
            console.log(req.file);
            console.log(req.body);
            const {requestType,requestOn,location,requestId,description,requiredDate,uploadDate,}=req.body;
            const data = await  serviceRequestModel.findByIdAndUpdate({_id: new ObjectId(req.params.id)},{
                requestType:requestType,
                requestOn:requestOn,
                location:location,
                requestId:requestId,
                description:description,
                requiredDate:requiredDate,
                uploadDate:uploadDate,
                uploadFilePath:req.file.path,
            });
            console.log(data)
            const result = await data.save();
            res.status(201).json({
                statusCode: 201,
                msg: "successfully updated",
                data: result
            })
        }
        catch (error) {
            res.status(500).json({ statusCode: 500, error: error.message });
        }

    },


    // -----------------------Delete service----------------------//
    async deleteService(req,res){
        const find=await serviceRequestModel.findById({_id:new ObjectId(req.params.id)}).lean();
        if(find==null){
            res.status(404).json({
                "statusCode":404,
                msg:"not found"
            })
        }
        else{
            const result = await serviceRequestModel.deleteOne({_id:new ObjectId(req.params.id)})
                res.status(201).json({
                    "statusCode":201,
                    "msg":"Delete successfully",
                    "data":result
                })
        }
        
    }
}

module.exports= controller;