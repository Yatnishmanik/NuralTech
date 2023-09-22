
const Joi = require("joi");
const {ObjectId}= require('mongodb')
const addTransferSchema=require('./assetTransfer.model');
const parentSchema = require('../addAsset/addAsset.model');

const controller ={

//<------------------------Create assetTransfer ----------------->
  async create(req, res) {
    try {
      const createschema = Joi.object({
        user:Joi.string(),
        assetInfo:Joi.array().items(Joi.string()),
        newlocation: Joi.string().required(),
        transferStatus: Joi.string().required(),
        allotedupto:Joi.string(), 
        transferto:Joi.string(),
        transferCC: Joi.array().items(Joi.string()),
        remark: Joi.string(),
        condition: Joi.string(),
        uploadfile: Joi.string(),        
      });
      
      const { error } = createschema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }
      //change in main asset transferTo data
       await parentSchema.findByIdAndUpdate(
        { _id: new ObjectId(req.body.assetInfo) },
        { 
          location:req.body.newlocation,
          transferredTo:req.body.transferto,
          status:req.body.tansferStatus,
        },
        { new: true }
      );
      //here we simple create transfer records
      const data = new addTransferSchema({
        user:req.body.user,
        assetInfo: req.body.assetInfo,
        newlocation: req.body.newlocation,
        transferStatus:req.body.transferStatus,
        allotedupto:req.body.allotedupto,
        transferto: req.body.transferto,
        transferCC: req.body.transferCC,
        remark: req.body.remark,
        condition: req.body.condition,
        uploadfile:req.file.path
      });
      // console.log(data);
      
      const result = await data.save();
      res.status(201).json({
        statusCode: 201,
        msg: "successfully created",
        data: result,
      });
    } 
    catch (error) {
      res.status(500).json({ statusCode: 500, error: error.message });
    }
  },



///<------------------------Get assetTransfer----------------------->

async getdata(req, res) {
    try {
      let {limit , skip} = req.query;
      limit = +limit ||10;
      skip = +skip ?? 0;
      // const result= await addTransferSchema.find({newlocation:req.body.filter}).populate('assetInfo');
      // console.log(result);
      const result = await addTransferSchema.find()
                                  .populate('assetInfo')
                                  .populate('newlocation')
                                  .populate('transferStatus')
                                  .populate('condition')
                                  .limit(limit)
                                  .skip(skip)
                                  .lean();
      console.log(result);
      const count = await addTransferSchema.count();
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





//<--------------------------Update assetTransfer------------------------------>

// async updatedata(req, res) {
//     try {
//       const createschema = Joi.object({
//         assetInfo:Joi.string(),
//         newlocation: Joi.string().required(),
//         tansferStatus: Joi.string().required(),
//         allotedupto:Joi.string(), 
//         transferto:Joi.string(),
//         transferCC: Joi.array().items(Joi.string()),
//         remark: Joi.string(),
//         condition: Joi.string(),
//         uploadfile: Joi.string(), 
//       });
//       const { error } = createschema.validate(req.body);
//       if (error) {
//         return res.status(400).json({
//           error: error.details[0].message,
//         });
//       }
//       const findData = await addTransferSchema.findById({
//         _id: new ObjectId(req.params.id),
//       });

//       if (!findData) {
//         res.status(404).json({
//           statusCode: 404,
//           msg: "Not Found",
//         });
//       } 
//       else {
//         const result = await addTransferSchema.findByIdAndUpdate(
//           { _id: new ObjectId(req.params.id) },
//           { 
//             assetInfo:req.body.assetInfo,
//             newlocation: req.body.newlocation,
//             tansferStatus:req.body.tansferStatus,
//             allotedupto:req.body.allotedupto,
//             transferto:req.body.transferto,
//             transferCC: req.body.transferCC,
//             remark: req.body.remark,
//             condition: req.body.condition,
//             uploadfile:req.file.path
//           },
//           { new: true }
//         );
//         res.status(201).json({
//           statusCode: 201,
//           msg: "updated successfully",
//           data: result,
//         });
//       }
//     } catch (error) {
//       res.status(500).json({ message: "Server error" });
//     }
//   },




//<-------------------------Delete assetTransfer----------------------------->


async deletedata(req, res) {
    const { id } = req.params;
    try {
      const del = await addTransferSchema.findByIdAndDelete(id);
      if (!del) {
        return res.status(404).json({ message: "data not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

};
module.exports = controller;
