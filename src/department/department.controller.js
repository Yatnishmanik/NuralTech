const Joi = require('joi');
const departmentModel = require('../department/department.model');

const {ObjectId} = require('mongodb')
const fs = require("fs");
const csvParser = require("csv-parser");
const path = require("path");
const csv = require("fast-csv");
const { download } = require("express/lib/response");
var data_exporter = require("json2csv").Parser;

const departmentOperations = {
    createDepartment: async function(req,res){
        try {
            const {dpt_name,dpt_code,contact_person,description,created_by} = req.body

            const departmentSchema = Joi.object({
                dpt_name:Joi.string().required(),
                dpt_code:Joi.string().required(),
                contact_person:Joi.string().required(),
                description:Joi.string().required(),
                created_by:Joi.string().required()
            })
            const { error,value } = departmentSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            } 

            const findDepartment = await departmentModel.findOne({dpt_name:dpt_name}).lean()
            if(findDepartment !=null){
                res.status(409).json({
                    "statusCode":409,
                    msg:"Already Exist"
                })
            }else{
               const result = await departmentModel.create({
                  dpt_name:dpt_name,
                  dpt_code: dpt_code,
                  contact_person: contact_person,
                  description: description,
                  created_by: created_by
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

    getAllDepartment : async function(req,res){
        
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;
    
            
            const result = await departmentModel.find().limit(limit).skip(skip).lean();
            const count = await departmentModel.count();
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

    updateDepartment : async function(req,res){
        try {
            const {dpt_name,dpt_code,contact_person,description,created_by} = req.body

            const departmentSchema = Joi.object({
                dpt_name:Joi.string().required(),
                dpt_code:Joi.string().required(),
                contact_person:Joi.string().required(),
                description:Joi.string().required(),
                created_by:Joi.string().required()
            })
            const { error,value } = departmentSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }
            
            const findDepartment = await departmentModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findDepartment ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await departmentModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                dpt_name:dpt_name,
                dpt_code: dpt_code,
                contact_person: contact_person,
                description: description,
                created_by: created_by

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

    deleteDepartment : async function(req,res){
        try {
            const findDepartment = await departmentModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findDepartment ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await departmentModel.deleteOne({_id:new ObjectId(req.params.id)})
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
                const allDepartment = await departmentModel.insertMany(allRecords);
                res.status(201).json({
                  message: "status created successfully",
                  results: allDepartment,
                });
              } catch (error) {
                return res.status(400).json(error);
              }
            });
        } catch (error) {
          res.status(500).json({ statusCode: 500, error: error.message });
        }
      },
    
      downloadExcelDepartment: async function (req, res) {
        const departmentData = await departmentModel.find();
        var condition = JSON.parse(JSON.stringify(departmentData));
        var file_header = [
          "Brand Type",
          "Date",
        ];
    
        var json_data = new data_exporter({ file_header });
    
        var csv_data = json_data.parse(condition);
    
        res.setHeader("Content-Type", "text/csv");
    
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=department_data.csv"
        );
    
        res.status(200).end(csv_data);
      },

}


module.exports = departmentOperations