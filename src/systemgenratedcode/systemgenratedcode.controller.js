const Joi = require("joi");
const {ObjectId} = require('mongodb')
const systemGencodeSchema = require("./systemgenratedcode.model");
const scheduleReportOperation = {



    //<----- create database ---->
async createSystemgencode(req,res,next) {
    try {
      const createSchema = Joi.object({
        module:Joi.string().required(),
        text2: Joi.string(),
        text1: Joi.string(),
        separator: Joi.string(),
        categoryCode: Joi.boolean(), 
        locationCode: Joi.boolean(),
        includeCategoryCode:Joi.boolean(),
        includeLocationCode:Joi.boolean(),
        changeAssetCode: Joi.boolean(),
        forceChangeAssetCode:Joi.boolean(),
        runningNumber:Joi.number().required(),
        createdBy: Joi.string()
      });
      const { error } = createSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
            error:error.details[0].message
       })
      }
      const {module,text2,text1,separator,categoryCode,locationCode,includeLocationCode, includeCategoryCode,
        changeAssetCode,forceChangeAssetCode,
        runningNumber, createdBy} = req.body;
      const user = new systemGencodeSchema({
        module:module,
        text2:text2,
        text1:text1,
        separator:separator,
        categoryCode:categoryCode,
        locationCode:locationCode,
        includeLocationCode:includeLocationCode,
        includeCategoryCode:includeCategoryCode,
        changeAssetCode:changeAssetCode,
        forceChangeAssetCode:forceChangeAssetCode,
        runningNumber:runningNumber,
        createdBy:createdBy
      });
      const newuser=await user.save();
      res.status(201).json({
        statusCode:201,
        msg:"successfully created",
        data:newuser
      })
    }
     catch (error) {
      res.status(500).json({ statusCode:500, error: error.message });
    }
  },




///<--------get data ------>
async getdatasystemgencode(req,res){
  try {
    let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;
            const result = await systemGencodeSchema.find().limit(limit).skip(skip).lean();
            const count = await systemGencodeSchema.count();
            const page = parseInt(req.query.page) || 1;
            res.status(200).json({
              "data":result,
              "page":page,
              "limit":limit,
              "totalPages": Math.ceil(count / limit),
              "totalResults": count,
              "statusCode":200,
            })
    const systemData = await systemGencodeSchema.find();
    if (!systemData) {
      return res.status(404).json({ message: 'data not found' });
    }
    res.json(systemData);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  },




///<--------- update ---------->
  async updatesystemGencode(req,res){
    try {  
        const createschema = Joi.object({
          module:Joi.string().required(),
          text2: Joi.string(),
          text1: Joi.string(),
          separator: Joi.string(),
          categoryCode: Joi.boolean(), 
          locationCode: Joi.boolean(),
          includeCategoryCode:Joi.boolean(),
          includeLocationCode:Joi.boolean(),
          changeAssetCode: Joi.boolean(),
          forceChangeAssetCode:Joi.boolean(),
          runningNumber:Joi.number().required(),
          createdBy: Joi.string()
          });
          const { error } = createschema.validate(req.body);
          if (error) {
            return res.status(400).json({
                error:error.details[0].message
           })
          }

        const findData=await systemGencodeSchema.findById({_id:new ObjectId(req.params.id)});

        if(findData == true){
            res.status(404).json({
                "statusCode":404,
                msg:"Not Found"
            })
        }
        else{
          const {module,text2,text1,separator,categoryCode,locationCode,includeLocationCode, includeCategoryCode,
            changeAssetCode,forceChangeAssetCode,
            runningNumber, createdBy} = req.body;
        const result = await systemGencodeSchema.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
          module:module,
        text2:text2,
        text1:text1,
        separator:separator,
        categoryCode:categoryCode,
        locationCode:locationCode,
        includeLocationCode:includeLocationCode,
        includeCategoryCode:includeCategoryCode,
        changeAssetCode:changeAssetCode,
        forceChangeAssetCode:forceChangeAssetCode,
        runningNumber:runningNumber,
        createdBy:createdBy
            },{new:true})
            res.status(201).json({
                "statusCode":201,
                "msg":"updated successfully",
                "data":result
            })
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
  },




  ///<-------deleted data---->>
  async deletesystemGencode(req,res){
    const {id} = req.params;
  try {
    const deletedSystemcode = await systemGencodeSchema.findByIdAndDelete(id);
    if (!deletedSystemcode) {
      return res.status(404).json({ message: 'data not found' });
    }
    res.json({ message: 'User deleted successfully' });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  }
};
module.exports = scheduleReportOperation;
