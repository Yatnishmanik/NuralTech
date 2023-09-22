const conditionModel = require('./condition.model')
const Joi = require('joi')
const {ObjectId} = require('mongodb')
const fs = require("fs");
const csvParser = require("csv-parser");
const path = require("path");
const csv = require("fast-csv");
const { download } = require("express/lib/response");
var data_exporter = require("json2csv").Parser;

const conditionOperation = {
    createCondition : async function(req, res){
        try {
            const conditionSchema = Joi.object({
                condition:Joi.string().required(),
            })
            const { error,value } = conditionSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const findCondition = await conditionModel.findOne({condition:req.body.condition}).lean()
            if(findCondition !=null){
                res.status(409).json({
                    "statusCode":409,
                    msg:"Already Exist"
                })
            }else{
               const result = await conditionModel.create({
                condition:req.body.condition,
                createdBy: req.body.createdBy
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

    getAllCondition : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;
    
            
            const result = await conditionModel.find().limit(limit).skip(skip).lean();
            const count = await conditionModel.count();
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

    updateCondition : async function(req,res){
        try {
            const conditionSchema = Joi.object({
                condition:Joi.string().required(),
            })
            const { error,value } = conditionSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const findCondition = await conditionModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findCondition ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await conditionModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                condition:req.body.condition,
                createdBy:req.body.createdBy
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

    deleteCondition : async function(req,res){
        try {
            const findCondition = await conditionModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findCondition ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await conditionModel.deleteOne({_id:new ObjectId(req.params.id)})
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
                const allCondition = await conditionModel.insertMany(allRecords);
                res.status(201).json({
                  message: "status created successfully",
                  results: allCondition,
                });
              } catch (error) {
                return res.status(400).json(error);
              }
            });
        } catch (error) {
          res.status(500).json({ statusCode: 500, error: error.message });
        }
      },
    
      downloadExcelCondition: async function (req, res) {
        const conditionData = await conditionModel.find();
        var condition = JSON.parse(JSON.stringify(conditionData));
        var file_header = [
          "Brand Type",
          "Date",
        ];
    
        var json_data = new data_exporter({ file_header });
    
        var csv_data = json_data.parse(condition);
    
        res.setHeader("Content-Type", "text/csv");
    
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=condition_data.csv"
        );
    
        res.status(200).end(csv_data);
      },
}

module.exports = conditionOperation