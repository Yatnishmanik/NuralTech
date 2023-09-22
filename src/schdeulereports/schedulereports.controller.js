const Joi = require('joi')
const scheduleReportModel = require('./schedulereports.model')
const {ObjectId} = require('mongodb')
const scheduleReportOperation = {
    createScheduleReport : async function(req, res){
        try {
            const scheduleReportSchema = Joi.object({
                selectReport:Joi.string().required(),
                sendEmailTo: Joi.string().required(),
                filter: Joi.string().required(),
                activityType:Joi.string(),
                ticketType: Joi.string(),
                userGroup: Joi.string(),
                assetLocation: Joi.array().required(),
                emailFrequency: Joi.string().required(),
                day: Joi.string(),
                scheduleDataRange: Joi.string().required(),
                sendEmailsTo: Joi.array()
                
            })
            const { error,value } = scheduleReportSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

               const {selectReport, sendEmailTo, filter, activityType, ticketType, userGroup, assetLocation, emailFrequency, day, scheduleDataRange, sendEmailsTo} = req.body
               const result = await scheduleReportModel.create({
                selectReport: selectReport,
                sendEmailTo: sendEmailTo,
                filter: filter,
                activityType: activityType,
                ticketType: ticketType,
                userGroup: userGroup,
                assetLocation: assetLocation,
                emailFrequency: emailFrequency,
                day: day,
                scheduleDataRange: scheduleDataRange,
                sendEmailsTo: sendEmailsTo
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

    getAllScheduleReport : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;
            const typeValue = req.params.type
           
            if(typeValue ==="activityType"){
                const result = await scheduleReportModel.find({filter:'ActivityType'}).limit(limit).skip(skip)
            .populate('activityType','activityType')
            .populate('assetLocation.locationId','parentLocation').lean();
            const count = await scheduleReportModel.find({filter:'ActivityType'}).count();
            res.status(200).json({
                "statusCode":200,
                "data":result,
                "count":count
            })

            }else if(typeValue === "ticketType"){
                const result = await scheduleReportModel.find({filter:'TicketType'}).limit(limit).skip(skip)
            .populate('ticketType','parentTicketType')
            .populate('assetLocation.locationId','parentLocation').lean();
            const count = await scheduleReportModel.find({filter:'TicketType'}).count();
            const page = parseInt(req.query.skip) || 1;

            res.status(200).json({
                "statusCode":200,
                "data":result,
                "page":page,
                "limit":limit,
                "totalPages": Math.ceil(count / limit),
                "totalResults": count,
            })

            }else{
                

                const result = await scheduleReportModel.find({filter:'UserGroup'}).limit(limit).skip(skip)
            .populate('userGroup')
            .populate('assetLocation.locationId','parentLocation').lean();
            const count = await scheduleReportModel.find({filter:'UserGroup'}).count();
            res.status(200).json({
                "statusCode":200,
                "data":result,
                "count":count
            })

            }
             
            
          } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
          }
    },  

    updateScheduleReport : async function(req,res){
        try {
            
            const scheduleReportSchema = Joi.object({
                selectReport:Joi.string().required(),
                sendEmailTo: Joi.string().required(),
                filter: Joi.string().required(),
                activityType:Joi.string(),
                ticketType: Joi.string(),
                userGroup: Joi.string(),
                assetLocation: Joi.array().required(),
                emailFrequency: Joi.string().required(),
                day: Joi.string(),
                scheduleDataRange: Joi.string().required(),
                sendEmailsTo: Joi.array()
                
            })
            const { error,value } = scheduleReportSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const {selectReport, sendEmailTo, filter, activityType, ticketType, userGroup, assetLocation, emailFrequency, day, scheduleDataRange, sendEmailsTo} = req.body
            const findScheduleReport = await scheduleReportModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findScheduleReport ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await scheduleReportModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                selectReport: selectReport,
                sendEmailTo: sendEmailTo,
                filter: filter,
                activityType: activityType,
                ticketType: ticketType,
                userGroup: userGroup,
                assetLocation: assetLocation,
                emailFrequency: emailFrequency,
                day: day,
                scheduleDataRange: scheduleDataRange,
                sendEmailsTo: sendEmailsTo
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

    deleteScheduleReport : async function(req,res){
        try {
            const findScheduleReport = await scheduleReportModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findScheduleReport ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await scheduleReportModel.deleteOne({_id:new ObjectId(req.params.id)})
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

module.exports = scheduleReportOperation