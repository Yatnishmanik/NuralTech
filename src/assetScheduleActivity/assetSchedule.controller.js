const Joi = require("joi");
const { ObjectId } = require("mongodb");
const fs = require('fs');
const mailer = require('../Utils/mailer');
const assetSchedule = require("./assetSchedule.model");

const controller = {

  async create(req, res) {
    try {
      const createSchema = Joi.object({
        assetName: Joi.array().items(Joi.string()),
        location: Joi.string().required(),
        serviceVendor: Joi.string(),
        activity: Joi.string().required(),
        description: Joi.string(),
        userGroup: Joi.string().required(),
        attachFile: Joi.string(),
        originalFile: Joi.string(),
        assignee: Joi.string().required(),
        occurs: Joi.string().required(),
        startDate: Joi.date().required(),
        activityReminder: Joi.string().required(),
        endDate: Joi.date(),
        sendEmailTo: Joi.array().items(Joi.string()),
        vendorName: Joi.string(),
        // email:Joi.string()
      });
      const { error } = createSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }
      const data = new assetSchedule({
        assetName: req.body.assetName,
        location: req.body.location,
        serviceVendor: req.body.serviceVendor,
        activity: req.body.activity,
        description: req.body.description,
        userGroup: req.body.userGroup,
        attachFile: req.file.path,
        originalFile: req.file.originalname,
        assignee: req.body.assignee,
        occurs: req.body.occurs,
        startDate: req.body.startDate,
        activityReminder: req.body.activityReminder,
        endDate: req.body.endDate,
        sendEmailTo: req.body.sendEmailTo,
        vendorName: req.body.vendorName,
      });
      const result = await data.save();
      mailer(req,res,'yatnishmanik123@gmail.com');
      res.status(201).json({
        statusCode: 201,
        msg: "successfully created",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ statusCode: 500, error: error.message });
    }
  },

  async getData(req, res) {
    try {
      let { limit, skip } = req.query;
      limit = +limit || 10;
      skip = +skip ?? 0;

      const result = await assetSchedule.find({markasDone:false})
                     .populate('assetName')
                     .populate('location')
                     .populate('serviceVendor')
                     .populate('activity')
                     .populate('userGroup')
                     .populate('vendorName')
                     .limit(limit).skip(skip).lean();
      const count = await assetSchedule.count();
      const page = parseInt(req.query.skip) || 0;
      res.status(200).json({
        data: result,
        page: page,
        limit: limit,
        totalPages: Math.ceil(count / limit),
        totalResults: count,
        statusCode: 200,
      });
    } catch (error) {
      res.status(500).json({ statusCode: 500, error: error.message });
    }
  },

  async updateData(req, res) {
    try {

      const createSchema = Joi.object({
        assetName: Joi.array().items(Joi.string()),
        location: Joi.string().required(),
        serviceVendor: Joi.string(),
        activity: Joi.string().required(),
        description: Joi.string(),
        userGroup: Joi.string().required(),
        attachFile: Joi.string(),
        originalFile: Joi.string(),
        assignee: Joi.string().required(),
        occurs: Joi.string().required(),
        startDate: Joi.date().required(),
        activityReminder: Joi.string().required(),
        endDate: Joi.date(),
        sendEmailTo: Joi.array().items(Joi.string()),
        vendorName: Joi.string(),
      });
      const { error } = createSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }

      const findData = await assetSchedule.findById({
        _id: new ObjectId(req.params.id),
      });

      console.log(findData.attachFile);
      if (!findData) {
        res.status(404).json({
          statusCode: 404,
          msg: "Not Found",
        }); nural - live
      }
      else {
        fs.unlinkSync(`${findData.attachFile}`);
        const result = await assetSchedule.findByIdAndUpdate(
          { _id: new ObjectId(req.params.id) },
          {
            assetName: req.body.assetName,
            location: req.body.location,
            serviceVendor: req.body.serviceVendor,
            activity: req.body.activity,
            description: req.body.description,
            userGroup: req.body.userGroup,
            attachFile: req.file.path,
            originalFile: req.file.originalname,
            assignee: req.body.assignee,
            occurs: req.body.occurs,
            startDate: req.body.startDate,
            activityReminder: req.body.activityReminder,
            endDate: req.body.endDate,
            sendEmailTo: req.body.sendEmailTo,
            vendorName: req.body.vendorName,
          },
          { new: true }
        );
        res.status(201).json({
          statusCode: 201,
          msg: "updated successfully",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({ message: "server error" });
    }
  },

  async deleteData(req, res) {
    const { id } = req.params;

    try {
      const del = await assetSchedule.findByIdAndDelete(id);
      if (!del) {
        return res.status(404).json({ message: "data not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  async updatePendingActivity(req, res) {
    try {
      const createSchema = Joi.object({
        remark:Joi.string(),
        serviceVendor: Joi.string(),
        userGroup: Joi.string().required(),
        attachFile: Joi.string(),
        originalFile: Joi.string(),
        assignee: Joi.string().required(),
        sendEmailTo: Joi.array().items(Joi.string()),
        vendorName: Joi.string(),
        markasDone:Joi.boolean(),
      });
      const { error } = createSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }
      const pendingResult = await assetSchedule.findByIdAndUpdate({ _id: new ObjectId(req.params.id) }, {
        markasDone: req.body.markasDone,
        remark: req.body.remark,
        assignee: req.body.assignee,
        vendorName: req.body.vendorName,
        sendEmailTo: req.body.sendEmailTo,
        serviceVendor: req.body.serviceVendor,
        userGroup: req.body.userGroup,
        attachFile: req.file.path,
        originalFile: req.file.originalname,
      }, { new: true });
      res.status(201).json({
        statusCode: 201,
        msg: "successfully updated",
        data: pendingResult,
      });
    }
    catch (error) {
      res.status(500).json({ statusCode: 500, error: error.message });
    }
  },

  async getPendingAcitivity(req,res){
    try {
      const currentDate = new Date();
      let { limit, skip } = req.query;
      limit = +limit || 10;
      skip = +skip ?? 0;
      const additionalConditions = {
        pending: true,
      };
      const result = await assetSchedule.find({ endDate: { $lt: currentDate }},...additionalConditions)
                     .populate('assetName')
                     .populate('location')
                     .populate('serviceVendor')
                     .populate('activity')
                     .populate('userGroup')
                     .populate('vendorName')
                     .limit(limit).skip(skip).lean();
      const count = await assetSchedule.count();
      const page = parseInt(req.query.skip) || 0;
      res.status(200).json({
        data: result,
        page: page,
        limit: limit,
        totalPages: Math.ceil(count / limit),
        totalResults: count,
        statusCode: 200,
      });
    } catch (error) {
      res.status(500).json({ statusCode: 500, error: error.message });
    }
  },

  async dueDateTracking(req,res){
    try {
      let { limit, skip } = req.query;
      limit = +limit || 10;
      skip = +skip ?? 0;

      const result = await assetSchedule.find({pending:true},{endDate:1})
                     .limit(limit).skip(skip).lean();
      const count = await assetSchedule.count();
      const page = parseInt(req.query.skip) || 0;
      res.status(200).json({
        data: result,
        page: page,
        limit: limit,
        totalPages: Math.ceil(count / limit),
        totalResults: count,
        statusCode: 200,
      });
    } catch (error) {
      res.status(500).json({ statusCode: 500, error: error.message });
    }
  },
  //<--------asset filter with asset or without asset------------------>
  async withassetSchedule(req,res){
    try {
      const cond= req.query.filter;
      if(cond=='without asset'){
        const data = await assetSchedule.find({ assetName: { $exists: true, $eq: [] } })
        console.log(data);
        res.status(200).json({data:data})
      }
      else{
        const data = await assetSchedule.find({ assetName: { $exists: true, $ne: [] } })
        console.log(data);
        res.status(200).json({data:data})

      }
    } catch (error) { 
      res.status(500).json({'error':error});
    }
  }
  
};


module.exports = controller;
