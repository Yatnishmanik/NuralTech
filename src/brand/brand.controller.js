const Joi = require('joi')
const brandModel = require('./brand.model')
const {ObjectId} = require('mongodb')
const fs = require("fs");
const csvParser = require("csv-parser");
const path = require("path");
const csv = require("fast-csv");
const { download } = require("express/lib/response");
var data_exporter = require("json2csv").Parser;

const barndOpreation = {
    createBrand : async function(req, res){
        try {

            const brandSchema = Joi.object({
                brand_type:Joi.string().required()
            })
            const { error,value } = brandSchema.validate(req.body,{abortEarly:false})
            if(error){
               return res.status(400).json({
                    error:error.details[0].message
               })
            }
            const findBrand = await brandModel.findOne({brand_type:req.body.brand_type}).lean()
            if(findBrand !=null){
                res.status(409).json({
                    "statusCode":409,
                    msg:"Already Exist"
                })
            }else{
               const result = await brandModel.create({
                brand_type:req.body.brand_type,
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

    getAllBrand : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;
      
            
            const result = await brandModel.find().limit(limit).skip(skip).lean();
            const count = await brandModel.count();
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

    updateBrand : async function(req,res){
        try {
            const brandSchema = Joi.object({
                brand_type:Joi.string().required()
            })
            const { error,value } = brandSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const findBrand = await brandModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findBrand ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await brandModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                brand_type:req.body.brand_type,
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

    deleteBrand : async function(req,res){
        try {
            const findBrand = await brandModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findBrand ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await brandModel.deleteOne({_id:new ObjectId(req.params.id)})
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
                const allBrand = await brandModel.insertMany(allRecords);
                res.status(201).json({
                  message: "brand created successfully",
                  results: allBrand,
                });
              } catch (error) {
                return res.status(400).json(error);
              }
            });
        } catch (error) {
          res.status(500).json({ statusCode: 500, error: error.message });
        }
      },
    
      downloadExcelBrand: async function (req, res) {
        const brandData = await brandModel.find();
        var locations = JSON.parse(JSON.stringify(brandData));
        var file_header = [
          "Brand Type",
          "Date",
        ];
    
        var json_data = new data_exporter({ file_header });
    
        var csv_data = json_data.parse(locations);
    
        res.setHeader("Content-Type", "text/csv");
    
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=brand_data.csv"
        );
    
        res.status(200).end(csv_data);
      },
}

module.exports = barndOpreation