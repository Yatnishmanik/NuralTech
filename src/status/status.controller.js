const Joi = require('joi')
const statusModel = require('./status.model')
const {ObjectId} = require('mongodb')
const fs = require("fs");
const csvParser = require("csv-parser");
const path = require("path");
const csv = require("fast-csv");
const { download } = require("express/lib/response");
var data_exporter = require("json2csv").Parser;

const statusOpreation = {
    createStatus : async function(req, res){
        try {
            const statusSchema = Joi.object({
                statusType:Joi.string().required(),
                statusName:Joi.string().required(),
                nextStatus:Joi.array(),
                createdBy:Joi.string().required()
            })
            const { error,value } = statusSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const findStatus = await statusModel.findOne({statusType:req.body.statusType}).lean()
            if(findStatus ==false){
                res.status(409).json({
                    "statusCode":409,
                    msg:"Already Exist"
                })
            }else{
               const result = await statusModel.create({
                statusType:req.body.statusType,
                statusName: req.body.statusName,
                nextStatus: req.body.nextStatus,
                createdBy: req.body.createdBy,
                })
                res.status(201).json({
                    "statusCode":201,
                    "msg":"created successfully",
                    "data":result
                })
            }
        } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
        }
      },

    getAllStatus : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await statusModel.find().limit(limit).skip(skip).lean();
            const count = await statusModel.count();
            const page = parseInt(req.query.page) || 1;
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

    updateStatus : async function(req,res){
        try {
            
            const statusSchema = Joi.object({
                statusType:Joi.string().required(),
                statusName:Joi.string().required(),
                nextStatus:Joi.array(),
                createdBy:Joi.string().required()
            })
            const { error,value } = statusSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const findStatus = await statusModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findStatus == true){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await statusModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                statusType:req.body.statusType,
                statusName: req.body.statusName,
                nextStatus: req.body.nextStatus,
                createdBy: req.body.createdBy,
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

    deleteStatus : async function(req,res){
        try {
            const findStatus = await statusModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findStatus == true){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await statusModel.deleteOne({_id:new ObjectId(req.params.id)})
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

    excelUpload: async function (req, res) {
        const allRecords = [];
        try {
          fs.createReadStream(
            path.join(__dirname, "../../", "/tmp/" + req.file.filename)
          )
            .pipe(csv.parse({ headers: true }))
            .on("error", (err) => console.log(err))
            .on("data", (row) => {
              allRecords.push(row);
            })
            .on("end", async (rowCount) => {
              console.log(`${rowCount} rows has parsed`);
              try {
                const allStatus = await statusModel.insertMany(allRecords);
                res.status(201).json({
                  message: "status created successfully",
                  results: allStatus,
                });
              } catch (error) {
                return res.status(400).json(error);
              }
            });
        } catch (error) {
          res.status(500).json({ statusCode: 500, error: error.message });
        }
      },
    
      downloadExcelStatus: async function (req, res) {
        const statusData = await statusModel.find();
        var status = JSON.parse(JSON.stringify(statusData));
        var file_header = [
          "Brand Type",
          "Date",
        ];
    
        var json_data = new data_exporter({ file_header });
    
        var csv_data = json_data.parse(status);
    
        res.setHeader("Content-Type", "text/csv");
    
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=brand_data.csv"
        );
    
        res.status(200).end(csv_data);
      },
}

module.exports = statusOpreation