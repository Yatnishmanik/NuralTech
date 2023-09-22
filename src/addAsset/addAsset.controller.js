const Joi = require("joi");
const { ObjectId } = require("mongodb");
const addassetschema = require("./addAsset.model");
const addassetController = {

  //<----- ------------------create database ------------------------------->
  async createcontroller(req, res) {
    try {
      const createschema = Joi.object({
        assetName: Joi.string().required(),
        assetCode: Joi.string(),
        category: Joi.string().required(),
        location: Joi.string().required(),
        status: Joi.string().required(),
        condition: Joi.string(),
        brand: Joi.string(),
        model: Joi.string(),
        linkedAsset: Joi.array().items(Joi.string()),
        Description: Joi.string(),
        serialNo: Joi.string(),
        vendorName: Joi.string(),
        poNumber: Joi.number(),
        invoiceDate: Joi.date(),
        invoiceNo: Joi.string(),
        purchaseDate: Joi.date(),
        purchasePrice: Joi.number(),
        selfOwener: Joi.boolean(),
        capitalizationPrice: Joi.number(),
        endlifeDate: Joi.date(),
        capitalizationDate: Joi.date(),
        depreciationPercent: Joi.number(),
        incomeTax: Joi.number(),
        scrapValue: Joi.string(),
        accumulatedDepression: Joi.number(),
        deparment: Joi.string(),
        transferredTo: Joi.string(),
        allottedUpto: Joi.date(),
        remarks: Joi.string(),
        amcVendor: Joi.string(),
        warrantyVendor: Joi.string(),
        insurancestartdate: Joi.date(),
        insuranceenddate: Joi.date(),
        amcstartDate: Joi.date(),
        amcendDate: Joi.date(),
        warantystartDate: Joi.date(),
        warantyendDate: Joi.date(),
      });
      const { error } = createschema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }
      // console.log(req.files);
      const data = new addassetschema({
        assetName: req.body.assetName,
        assetImage: req.files.image[0].path,
        assetimageOriginal: req.files.image[0].originalname,
        uploadFilespath: req.files.filesss[0].path,
        uploadfilesorginal: req.files.filesss[0].originalname,
        assetCode: req.body.assetCode,
        category: req.body.category,
        location: req.body.location,
        status: req.body.status,
        condition: req.body.condition,
        brand: req.body.brand,
        model: req.body.model,
        linkedAsset: req.body.linkedAsset,
        Description: req.body.Description,
        serialNo: req.body.serialNo,
        vendorName: req.body.vendorName,
        poNumber: req.body.poNumber,
        invoiceDate: req.body.invoiceDate,
        invoiceNo: req.body.invoiceNo,
        purchaseDate: req.body.purchaseDate,
        purchasePrice: req.body.purchasePrice,
        selfOwener: req.body.selfOwener,
        capitalizationPrice: req.body.capitalizationPrice,
        endlifeDate: req.body.endlifeDate,
        capitalizationDate: req.body.capitalizationDate,
        depreciationPercent: req.body.depreciationPercent,
        incomeTax: req.body.incomeTax,
        scrapValue: req.body.scrapValue,
        accumulatedDepression: req.body.accumulatedDepression,
        department: req.body.department,
        transferredTo: req.body.transferredTo,
        allottedUpto: req.body.allottedUpto,
        remarks: req.body.remarks,
        amcVendor: req.body.amcVendor,
        warrantyVendor: req.body.warrantyVendor,
        insurancestartdate: req.body.insurancestartdate,
        insuranceenddate: req.body.insuranceenddate,
        amcstartDate: req.body.amcstartDate,
        amcendDate: req.body.amcendDate,
        warantystartDate: req.body.warantystartDate,
        warantyendDate: req.body.warantyendDate,
      });
      
      const result = await data.save();
      res.status(201).json({
        statusCode: 201,
        msg: "successfully created",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ statusCode: 500, error: error.message });
    }
  },

  ///<------------------------------Get Alldatabase ----------------------------->
  async getcontroller(req, res) {
    try {
      let { limit, skip } = req.query;
      limit = +limit || 10;
      skip = +skip ?? 0;
      const result = await addassetschema.find({ discardCheck: false })
                            .populate('linkedAsset')
                            .populate('category')
                            .populate('location')
                            .populate('status')
                            .populate('condition')
                            .populate('brand')
                            .populate('vendorName')
                            .populate('amcVendor')
                            .populate('warrantyVendor')
                            .populate('department').populate('model').limit(limit)
                            .skip(skip).lean();
      console.log(result);
      const count = await addassetschema.count();
      const page = parseInt(req.query.skip) || 0;
      res.status(200).json({
        "data": result,
        "page": page,
        "limit": limit,
        "totalPages": Math.ceil(count / limit),
        "totalResults": count,
        "statusCode": 200,
      })
    } catch (error) {
      res.status(500).json({ statusCode: 500, error: error.message });
    }
  },

  ///<--------- ----------------update database--------------------- ---------->
  async updatecontroller(req, res) {
    try {
      console.log('hello1');
      const createschema = Joi.object({
        assetName: Joi.string().required(),
        assetImage: Joi.string(),
        assetCode: Joi.string(),
        category: Joi.string().required(),
        location: Joi.string().required(),
        status: Joi.string().required(),
        condition: Joi.string(),
        brand: Joi.string(),
        model: Joi.string(),
        linkedAsset: Joi.array().items(),
        Description: Joi.string(),
        serialNo: Joi.string(),
        vendorName: Joi.string(),
        poNumber: Joi.number(),
        invoiceDate: Joi.date(),
        invoiceNo: Joi.string(),
        purchaseDate: Joi.date(),
        purchasePrice: Joi.number(),
        selfOwener: Joi.boolean(),
        capitalizationPrice: Joi.number(),
        endlifeDate: Joi.date(),
        capitalizationDate: Joi.date(),
        depreciationPercent: Joi.number(),
        incomeTax: Joi.number(),
        scrapValue: Joi.string(),
        accumulatedDepression: Joi.number(),
        deparment: Joi.string(),
        remarks: Joi.string(),
        amcVendor: Joi.string(),
        warrantyVendor: Joi.string(),
        insurancestartdate: Joi.date(),
        insuranceenddate: Joi.date(),
        amcstartDate: Joi.date(),
        amcendDate: Joi.date(),
        warantystartDate: Joi.date(),
        warantyendDate: Joi.date(),
      });
      const { error } = createschema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }
      const findData = await addassetschema.findById({
        _id: new ObjectId(req.params.id),
      });
      console.log('hello')
      if (findData == true) {
        res.status(404).json({
          statusCode: 404,
          msg: "Not Found",
        });
      } 
      else {
        const result = await addassetschema.findByIdAndUpdate(
          { _id: new ObjectId(req.params.id) },
          {
            assetName: req.body.assetName,
            assetImage: req.files.image[0].path,
            assetimageOriginal: req.files.image[0].originalname,
            uploadFilespath: req.files.filesss[0].path,
            uploadfilesorginal: req.files.filesss[0].originalname,
            assetCode: req.body.assetCode,
            category: req.body.category,
            location: req.body.location,
            status: req.body.status,
            condition: req.body.condition,
            brand: req.body.brand,
            model: req.body.model,
            linkedAsset: req.body.linkedAsset,
            Description: req.body.Description,
            serialNo: req.body.serialNo,
            vendorName: req.body.vendorName,
            poNumber: req.body.poNumber,
            invoiceDate: req.body.invoiceDate,
            invoiceNo: req.body.invoiceNo,
            purchaseDate: req.body.purchaseDate,
            purchasePrice: req.body.purchasePrice,
            selfOwener: req.body.selfOwener,
            capitalizationPrice: req.body.capitalizationPrice,
            endlifeDate: req.body.endlifeDate,
            capitalizationDate: req.body.capitalizationDate,
            depreciationPercent: req.body.depreciationPercent,
            incomeTax: req.body.incomeTax,
            scrapValue: req.body.scrapValue,
            accumulatedDepression: req.body.accumulatedDepression,
            department: req.body.department,
            remarks: req.body.remarks,
            amcVendor: req.body.amcVendor,
            warrantyVendor: req.body.warrantyVendor,
            insurancestartdate: req.body.insurancestartdate,
            insuranceenddate: req.body.insuranceenddate,
            amcstartDate: req.body.amcstartDate,
            amcendDate: req.body.amcendDate,
            warantystartDate: req.body.warantystartDate,
            warantyendDate: req.body.warantyendDate,
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
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  
  ///<----------------deleted data from database----------------------->>
  async deletecontroller(req, res) {
    const { id } = req.params;
    try {
      const deletedSystemcode = await addassetschema.findByIdAndDelete(id);
      if (!deletedSystemcode) {
        return res.status(404).json({ message: "data not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  //<--------bulk Uploader function ------------>
  async datasave(req,res,data){
    data.map(async(req,res,item)=>{
      const createschema = Joi.object({
        assetName: Joi.string().required(),
        assetCode: Joi.string(),
        category: Joi.string().required(),
        location: Joi.string().required(),
        status: Joi.string().required(),
        condition: Joi.string(),
        brand: Joi.string(),
        model: Joi.string(),
        Description: Joi.string(),
        serialNo: Joi.string(),
        vendorName: Joi.string(),
        poNumber: Joi.number(),
        invoiceDate: Joi.date(),
        invoiceNo: Joi.string(),
        purchaseDate: Joi.date(),
        purchasePrice: Joi.number(),
        selfOwener: Joi.boolean(),
        capitalizationPrice: Joi.number(),
        endlifeDate: Joi.date(),
        capitalizationDate: Joi.date(),
        depreciationPercent: Joi.number(),
        incomeTax: Joi.number(),
        scrapValue: Joi.string(),
        accumulatedDepression: Joi.number(),
        deparment: Joi.string(),
        transferredTo: Joi.string(),
        allottedUpto: Joi.date(),
        remarks: Joi.string(),
        amcVendor: Joi.string(),
        warrantyVendor: Joi.string(),
        insurancestartdate: Joi.date(),
        insuranceenddate: Joi.date(),
        amcstartDate: Joi.date(),
        amcendDate: Joi.date(),
        warantystartDate: Joi.date(),
        warantyendDate: Joi.date(),
      });
      const { error } = createschema.validate(item);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }
      const dataa = new addassetschema({
        assetName: item.assetName,
        assetCode: item.assetCode,
        category: item.category,
        location: item.location,
        status: item.status,
        condition: item.condition,
        brand: item.brand,
        model: item.model,
        Description: item.Description,
        serialNo: item.serialNo,
        vendorName: item.vendorName,
        poNumber: item.poNumber,
        invoiceDate: item.invoiceDate,
        invoiceNo: item.invoiceNo,
        purchaseDate: item.purchaseDate,
        purchasePrice: item.purchasePrice,
        selfOwener: item.selfOwener,
        capitalizationPrice: item.capitalizationPrice,
        endlifeDate: item.endlifeDate,
        capitalizationDate: item.capitalizationDate,
        depreciationPercent: item.depreciationPercent,
        incomeTax: item.incomeTax,
        scrapValue: item.scrapValue,
        accumulatedDepression: item.accumulatedDepression,
        department: item.department,
        transferredTo: item.transferredTo,
        allottedUpto: item.allottedUpto,
        remarks: item.remarks,
        amcVendor: item.amcVendor,
        warrantyVendor: item.warrantyVendor,
        insurancestartdate: item.insurancestartdate,
        insuranceenddate: item.insuranceenddate,
        amcstartDate: item.amcstartDate,
        amcendDate: item.amcendDate,
        warantystartDate: item.warantystartDate,
        warantyendDate: item.warantyendDate,
      });
      const output = await dataa.save();
    })
  },
  
};
module.exports = addassetController;
