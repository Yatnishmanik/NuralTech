const Joi = require("joi");
const { ObjectId } = require("mongodb");
const discardAsset=require('./assetDiscard.model');
const assetSchema = require('../addAsset/addAsset.model');
const assetSchedule = require('../assetScheduleActivity/assetSchedule.model')
const controller = {

///<------------------------discardAsset----------------------->



async discardAsset(req,res){
  try {
    console.log(req.body);
    const arrayelement = Joi.object({
      assetId:Joi.string(),
      soldValue: Joi.number(),
      remarks: Joi.string(),
      wdv:Joi.number(),
    });
          const createschema = Joi.object({
          assetInfo:Joi.array().items(arrayelement),
          reason: Joi.string().required(),
          discardate:Joi.date(), 
          vendorname:Joi.string(),
          remark: Joi.string(),
          taxGroup: Joi.string(),
          uploadfile: Joi.string(),
          originalfile: Joi.string(),        
      });
      const { error } = createschema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }
      const data = new discardAsset({
        assetInfo: req.body.assetInfo.map(item => ({
          assetId: item.assetId,
          soldValue: item.soldValue,
          wdv: item.wdv,
          remark: item.remark,
        })),
        reason: req.body.reason,
        discardate: req.body.discardate,
        vendorname: req.body.vendorname,
        remark: req.body.remark,
        taxGroup: req.body.taxGroup,
        uploadfile: req.body.uploadfile,
        originalfile: req.body.originalfile,
      });
      let assettt= data.assetInfo;
      try {
        for (const asset of assettt) {
          const updatedAsset = await assetSchema.findOneAndUpdate(
            { _id: asset.assetId },
            {
              $set: {
                discardCheck: true,
              },
            },
            { new: true }
          );
          // Handle the updatedAsset if needed
          console.log('Updated Asset:', updatedAsset);
        }
        console.log('All assets updated successfully.');
      } catch (error) {
        console.error('Error updating assets:', error);
      }
      
      console.log(data);
      const result = await data.save();
      res.status(201).json({
        statusCode: 201,
        msg: "successfully Discarded",
        data: result,
      });
        
      } 
    catch (error) {
      res.status(500).json({ statusCode: 500, error: error.message });
    }
  },



  //<------------------------getdata-------------------->

  async getdata(req,res){
    try {
      let {limit , skip} = req.query;
      limit = +limit ||10;
      skip = +skip ?? 0;

      const result = await discardAsset.find()
                    .populate('assetInfo.assetId')
                    .populate('vendorname')
                    .populate('taxGroup')
                    .limit(limit).skip(skip).lean();
      const count = await discardAsset.count();
      const page = parseInt(req.query.skip) || 0;
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


//<------------------------ deleteupdate --------------->

  async deletedata(req,res){
      const { id } = req.params;
      try {
        const del = await assetSchema.findByIdAndDelete({id});
        if(!del){
          return res.status(404).json({ message: "data not found" });
        }
        res.json({ message: "User deleted successfully" });
      }catch (error){
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
  }

};
module.exports = controller;
