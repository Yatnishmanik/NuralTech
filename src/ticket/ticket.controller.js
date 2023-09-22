const Joi = require('joi')
const ticketModels = require('./ticket.model')
const {ObjectId} = require('mongodb')
const ticketOperation ={
    createTicket : async function(req, res){
        try {
            const ticketSchema = Joi.object({
                asset:Joi.string().required(),
                assetLocation:Joi.string().required(),
                serviceVendor: Joi.string().required(),
                ticketType: Joi.string().required(),
                ticketGroup: Joi.string(),
                assignee: Joi.string(),
                reportedDate:Joi.string().required(),   
                priority: Joi.string().required(),
                reportedBy: Joi.string().required(),
                description: Joi.string(),
                ccEmail: Joi.string(),
                notifyReported:Joi.boolean()
            })
            const { error,value } = ticketSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            
               const result = await ticketModels.create({
                asset: req.body.asset,
                assetLocation: req.body.assetLocation,
                serviceVendor: req.body.serviceVendor,
                ticketType: req.body.ticketType,
                ticketGroup: req.body.ticketGroup,
                assignee: req.body.assignee,
                reportedDate: req.body.reportedDate,
                priority: req.body.priority,
                reportedBy: req.body.reportedBy,
                description: req.body.description,
                filePath:req.file.path,
                fileName:req.file.originalname,
                ccEmail: req.body.ccEmail,
                notifyReported: req.body.notifyReported
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

    getAllTicket : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await ticketModels.find()
            .populate('asset','assetName')
            .populate('assetLocation','location') 
            .populate('serviceVendor')
            .populate('ticketType','ticketType')
            .populate('priority','priority')
            .limit(limit).skip(skip).lean();
            const count = await ticketModels.count();
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

    updateTicket : async function(req,res){

        try {

            const ticketSchema = Joi.object({
                asset:Joi.string().required(),
                assetLocation:Joi.string().required(),
                serviceVendor: Joi.string().required(),
                ticketType: Joi.string().required(),
                ticketGroup: Joi.string(),
                assignee: Joi.string(),
                reportedDate:Joi.string().required(),   
                priority: Joi.string().required(),
                reportedBy: Joi.string().required(),
                description: Joi.string(),
                ccEmail: Joi.string(),
                notifyReported:Joi.boolean()
            })
            const { error,value } = ticketSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }
            
            const findTicket = await ticketModels.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findTicket ==true){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await ticketModels.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                asset: req.body.asset,
                assetLocation: req.body.assetLocation,
                serviceVendor: req.body.serviceVendor,
                ticketType: req.body.ticketType,
                ticketGroup: req.body.ticketGroup,
                assignee: req.body.assignee,
                reportedDate: req.body.reportedDate,
                priority: req.body.priority,
                reportedBy: req.body.reportedBy,
                description: req.body.description,
                filePath:req.file.path,
                fileName:req.file.originalname,
                ccEmail: req.body.ccEmail,
                notifyReported: req.body.notifyReported
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

    deleteTicket : async function(req,res){
        try {
            const findTicket = await ticketModels.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findTicket ==true){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await ticketModels.deleteOne({_id:new ObjectId(req.params.id)})
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

    updateTicketCheckIn: async function  (req, res){
       try {
       
         const findTicket = await ticketModels.findById({_id: new ObjectId(req.params.id)}).lean()
         
         if(findTicket ==true){
            res.status(404).json({
                "statusCode":404,
                msg:"Not Found"
            })
        }else{
            const result = await ticketModels.findByIdAndUpdate({_id: new ObjectId(req.params.id)},
            {
                ticketCheckInCheckOut:req.body.ticketCheckInCheckOut
            },{new:true})
            res.status(201).json({
                "statusCode":201,
                "msg":"updated successfully",
                "data":result
            })
        }
       } catch (error) {
        res.status(500).json({statusCode:500, error:error.message})
       }
    },

    updateTicketHold: async function (req, res){
        try {
            const findTicket = await ticketModels.findById({_id: new ObjectId(req.params.id)})
            if(findTicket ==true){
               res.status(404).json({
                   "statusCode":404,
                    msg:"Not Found"
               })
           }else{
               const result = await ticketModels.findByIdAndUpdate({_id: new ObjectId(req.params.id)},
               {
                ticketHoldRelease:req.body.ticketHoldRelease
               },{new:true})
               
               res.status(201).json({
                   "statusCode":201,
                   "msg":"updated successfully",
                   "data":result
               })
           }
          } catch (error) {
           res.status(500).json({statusCode:500, error:error.message})
          }
    },
    updateTicketStatus: async function(req, res){
        try {
            const findTicket = await ticketModels.findById({_id: new ObjectId(req.params.id)})
            if(findTicket ==true){
                res.status(404).json({
                    "statusCode":404,
                     msg:"Not Found"
                })
            }else{
                const result = await ticketModels.findByIdAndUpdate({_id: new ObjectId(req.params.id)},
                {
                 status:req.body.status
                },{new:true})
                
                res.status(201).json({
                    "statusCode":201,
                    "msg":"updated successfully",
                    "data":result
                })
            }
        } catch (error) {
            res.status(500).json({statusCode:500, error:error.message})
        }
    },

    getAllTicketStatus: async function(req, res){
        try {
            const status = req.query.status
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await ticketModels.find({status:status})
            .populate('asset','assetName')
            .populate('assetLocation','location') 
            .populate('serviceVendor')
            .populate('ticketType','ticketType')
            .populate('priority','priority')
            .populate('status','statusName')
            .limit(limit).skip(skip).lean();
            const count = await ticketModels.count();
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
            res.status(500).json({statusCode:500, error:error.message})
        }
    }
    
}

module.exports = ticketOperation