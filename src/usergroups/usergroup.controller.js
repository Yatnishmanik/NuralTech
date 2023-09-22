const Joi = require('joi')
const userGroupModel = require('./usergroups.model')
const {ObjectId} = require('mongodb')
const userGroupOperation = {
    createUserGroup : async function(req, res){
        try {
            const userGroupSchema = Joi.object({
                groupName:Joi.string().required(),
                groupUser: Joi.array().required(),
                userGroupHead: Joi.string(),
                userGroupType: Joi.string().required(),
                assetLocations: Joi.array().required(),
                ticketTypes: Joi.array(),
                role: Joi.array().required(),
                defaultAssignee: Joi.string(),
                additionalcc: Joi.string(),
                assetCategories: Joi.array(),
                description: Joi.string(),
                location:Joi.string(),
                ticketType:Joi.string(),
                priority:Joi.string()
            })
            const { error,value } = userGroupSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

               const {groupName, groupUser, userGroupHead, userGroupType, assetLocations, ticketTypes, role, defaultAssignee, assetCategories,additionalcc, description, location, ticketType, priority} = req.body
               const result = await userGroupModel.create({
                groupName:groupName,
                groupUser:groupUser,
                userGroupHead: userGroupHead,
                userGroupType: userGroupType,
                assetLocations: assetLocations,
                ticketTypes: ticketTypes,
                role: role,
                defaultAssignee:defaultAssignee,
                assetCategories:assetCategories,
                additionalcc: additionalcc,
                description: description,
                location: location,
                ticketType: ticketType,
                priority: priority
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

    getAllUserGroup : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;
             
            const result = await userGroupModel.find().limit(limit).skip(skip)
            .populate('assetLocations.assetLocationId','parentLocation')
            .populate('ticketTypes.ticketId','parentTicketType')
            .populate('assetCategories.categoryId','name')
            .populate('location')
            .populate('ticketType')
            .populate('priority').lean();
            const count = await userGroupModel.count();
            const page = parseInt(req.query.page) || 1;

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

    updateUserGroup : async function(req,res){
        try {
            
            const ticketTypeSchema = Joi.object({
                parentTicketType:Joi.string().required(),
                ticketType: Joi.string().required(),
                category: Joi.array().required(),
                expectedTat: Joi.string().required(),
                activityType: Joi.array().required(),
                ticketTypeDuration: Joi.string().required(),
                reason: Joi.string().required(),
                role: Joi.string().required(),
                reOpened: Joi.string().required(),
                otpRequired: Joi.boolean().required(),
                forwardingEmail: Joi.boolean().required()
            })
            const { error,value } = ticketTypeSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const {parentTicketType, ticketType, category, expectedTat, activityType, ticketTypeDuration, reason, role, reOpened, otpRequired, forwardingEmail} = req.body
            const findTicketType = await ticketTypeModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findTicketType ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await ticketTypeModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
               parentTicketType:parentTicketType,
                ticketType:ticketType,
                category: category,
                expectedTat: expectedTat,
                activityType: activityType,
                ticketTypeDuration: ticketTypeDuration,
                reason: reason,
                role:role,
                reOpened: reOpened,
                otpRequired: otpRequired,
                forwardingEmail: forwardingEmail
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

    deleteUserGroup : async function(req,res){
        try {
            const findTicketType = await ticketTypeModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findTicketType ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await ticketTypeModel.deleteOne({_id:new ObjectId(req.params.id)})
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

module.exports = userGroupOperation