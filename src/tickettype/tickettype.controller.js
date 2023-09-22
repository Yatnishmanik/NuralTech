const Joi = require('joi')
const ticketTypeModel = require('./tickettype.model')
const {ObjectId} = require('mongodb')
const ticketTypeOperation = {
    createTicketType : async function(req, res){
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
               const result = await ticketTypeModel.create({
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

    getAllTicketType : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await ticketTypeModel.find().limit(limit).skip(skip).lean();
            const count = await ticketTypeModel.count();
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

    updateTicketType : async function(req,res){
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

    deleteTicketType : async function(req,res){
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

module.exports = ticketTypeOperation