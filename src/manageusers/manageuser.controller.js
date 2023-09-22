const Joi = require('joi')
const manageUserModel = require('./manageuser.model')
const {ObjectId} = require('mongodb')

const locationOperation = {
    createManageUser : async function(req, res){
        try {
            
            const manageUserSchema = Joi.object({
                fullName:Joi.string().required(),
                role: Joi.string().required(),
                contactNumber: Joi.number().min(10),
                department: Joi.string(),
                language: Joi.string(),
                trackUserLocation: Joi.boolean(),
                timeZone: Joi.string(),
                emailAddress: Joi.string(),
                reportingManager: Joi.string(),
                location: Joi.string(),
                singleSignOnUsername: Joi.string(),
                defaultScreen :Joi.string(),
                createdBy:Joi.string().required(),
                
            })
            const { error,value } = manageUserSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

               

               const result = await manageUserModel.create({
                fullName: req.body.fullName,
                role: req.body.role,
                contactNumber: req.body.contactNumber,
                department: req.body.department,
                language: req.body.language,
                trackUserLocation: req.body.trackUserLocation,
                timeZone: req.body.timeZone,
                emailAddress: req.body.emailAddress,
                reportingManager: req.body.reportingManager,
                location: req.body.location,
                singleSignOnUsername: req.body.singleSignOnUsername,
                defaultScreen : req.body.defaultScreen,
                createdBy: req.body.createdBy,
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

    getAllManageUser : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await manageUserModel.find().limit(limit).skip(skip).lean();
            const count = await manageUserModel.count();
            const page = parseInt(req.query.skip) || 1;
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

    updateManagementUser : async function(req,res){
        try {
            const manageUserSchema = Joi.object({
                fullName:Joi.string().required(),
                role: Joi.string().required(),
                contactNumber: Joi.number().min(10),
                department: Joi.string(),
                language: Joi.string(),
                trackUserLocation: Joi.boolean(),
                timeZone: Joi.string(),
                emailAddress: Joi.string(),
                reportingManager: Joi.string(),
                location: Joi.string(),
                singleSignOnUsername: Joi.string(),
                defaultScreen :Joi.string(),
                createdBy:Joi.string().required(),
                modifiedBy: Joi.string().required(),
                lastAccessOn: Joi.string().required()
                
            })
            const { error,value } = manageUserSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }






            const findManageUser = await manageUserModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findManageUser ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await manageUserModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                fullName: req.body.fullName,
                role: req.body.role,
                contactNumber: req.body.contactNumber,
                department: req.body.department,
                language: req.body.language,
                trackUserLocation: req.body.trackUserLocation,
                timeZone: req.body.timeZone,
                emailAddress: req.body.emailAddress,
                reportingManager: req.body.reportingManager,
                location: req.body.location,
                singleSignOnUsername: req.body.singleSignOnUsername,
                defaultScreen : req.body.defaultScreen,
                createdBy: req.body.createdBy,
                modifiedBy: req.body.modifiedBy,
                lastAccessOn: req.body.lastAccessOn

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

    deleteManageUser : async function(req,res){
        try {
            const findManageUser = await manageUserModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findManageUser ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await manageUserModel.deleteOne({_id:new ObjectId(req.params.id)})
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

module.exports = locationOperation