const Joi = require('joi')
const requestTypeModel = require('./requesttype.model')
const {ObjectId} = require('mongodb')
const requestTypeOperation = {
    createRequestType : async function(req, res){
        try {
            const requestTypeSchema = Joi.object({
                requestMode:Joi.string().required(),
                category: Joi.array().required(),
                departmentRequired: Joi.boolean(),
                requestType:Joi.string(),
                requestTypeCC: Joi.array(),
                allowItemRequest: Joi.boolean(),
                disablePriceEdit: Joi.boolean(),
                statusForAssetLocation: Joi.array(),
                defaultAssignee: Joi.string().required(),
                specificLocationAssignee: Joi.array(),
               
                
            })
            const { error,value } = requestTypeSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

               const {requestMode, category, departmentRequired, requestType, requestTypeCC, allowItemRequest, disablePriceEdit, statusForAssetLocation, defaultAssignee, specificLocationAssignee} = req.body
               const result = await requestTypeModel.create({
                requestMode: requestMode,
                category: category,
                departmentRequired: departmentRequired,
                requestType: requestType,
                requestTypeCC: requestTypeCC,
                allowItemRequest: allowItemRequest,
                disablePriceEdit: disablePriceEdit,
                statusForAssetLocation: statusForAssetLocation,
                defaultAssignee: defaultAssignee,
                specificLocationAssignee: specificLocationAssignee
                
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

    getAllRequestType : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;
            
           
           
            const result = await requestTypeModel.find().limit(limit).skip(skip)
            .populate('statusForAssetLocation.statusId')
            .populate('specificLocationAssignee.assetLocation.locationId','parentLocation').lean();
            const count = await requestTypeModel.find().count();
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

    updateRequestType : async function(req,res){
        try {
            
            const requestTypeSchema = Joi.object({
                requestMode:Joi.string().required(),
                category: Joi.array().required(),
                departmentRequired: Joi.boolean(),
                requestType:Joi.string(),
                requestTypeCC: Joi.array(),
                allowItemRequest: Joi.boolean(),
                disablePriceEdit: Joi.boolean(),
                statusForAssetLocation: Joi.array(),
                defaultAssignee: Joi.string().required(),
                specificLocationAssignee: Joi.array(),
                
            })
            const { error,value } = requestTypeSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const {requestMode, category, departmentRequired, requestType, requestTypeCC, allowItemRequest, disablePriceEdit, statusForAssetLocation, defaultAssignee, specificLocationAssignee} = req.body
            const findScheduleReport = await  requestTypeModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findScheduleReport ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await requestTypeModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                requestMode: requestMode,
                category: category,
                departmentRequired: departmentRequired,
                requestType: requestType,
                requestTypeCC: requestTypeCC,
                allowItemRequest: allowItemRequest,
                disablePriceEdit: disablePriceEdit,
                statusForAssetLocation: statusForAssetLocation,
                defaultAssignee: defaultAssignee,
                specificLocationAssignee: specificLocationAssignee
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

    deleteRequestType : async function(req,res){
        try {
            const findRequestType = await requestTypeModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findRequestType ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await requestTypeModel.deleteOne({_id:new ObjectId(req.params.id)})
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

module.exports = requestTypeOperation