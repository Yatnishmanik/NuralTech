const Joi = require('joi');
const vendorModel = require('./vendorCustomer.model');
const {ObjectId} = require('mongodb')
const fs = require('fs');
const csvParser = require('csv-parser');
const path = require('path')
const csv = require('fast-csv');
const { download } = require('express/lib/response');
var data_exporter = require('json2csv').Parser;

const vendorOperation = {
    createVendor : async function(req, res){
        try {
            const {vendorCode, vendor_name, email, contactName, contactPerson, contactNumber, customer, address1, address2, city, state, postalCode, country, govtRegistration1, govtRegistration2, govtRegistration3, notes, createUserVendor, showTicketReported, location, createdBy} = req.body

            const VendorSchema = Joi.object({
                vendorCode:Joi.string(),
                vendor_name: Joi.string().required(),
                email:Joi.string().email(),
                contactName:Joi.string(),
                contactPerson: Joi.string(),
                contactNumber: Joi.number(),
                customer: Joi.boolean(),
                address1: Joi.string(),
                address2:Joi.string(),
                city: Joi.string(),
                state: Joi.string(),
                postalCode: Joi.string(),
                country:Joi.string(),
                govtRegistration1: Joi.string(),
                govtRegistration2:Joi.string(),
                govtRegistration3:Joi.string(),
                notes:Joi.string(),
                createUserVendor:Joi.boolean(),
                showTicketReported:Joi.boolean(),
                location:Joi.string(),
                createdBy: Joi.string().required()
            })
            const { error,value } = VendorSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }
            
            // const findStatus = await vendorModel.findOne({tax_group:req.body.tax_group}).lean()
            // if(findStatus ==false){
            //     res.status(409).json({
            //         "statusCode":409,
            //         msg:"Already Exist"
            //     })
            // }else{
                
               const result = await vendorModel.create({
                vendorCode:vendorCode,
                vendor_name: vendor_name,
                email: email,
                contactName:contactName,
                contactPerson: contactPerson,
                contactNumber: contactNumber,
                customer: customer,
                address1: address1,
                address2:address2,
                city: city,
                state: state,
                postalCode: postalCode,
                country:country,
                govtRegistration1: govtRegistration1,
                govtRegistration2: govtRegistration2,
                govtRegistration3: govtRegistration3,
                notes: notes,
                createUserVendor: createUserVendor,
                showTicketReported:showTicketReported,
                location:location,
                createdBy: createdBy
                })
                res.status(201).json({
                    "statusCode":201,
                    "msg":"created successfully",
                    "data":result
                })
             //}
        } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
        }
      },

    getAllVendor : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await vendorModel.find().limit(limit).skip(skip).lean();
            const count = await vendorModel.count();
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

    updateVendor : async function(req,res){
        const {vendorCode, vendor_name, email, contactName, contactPerson, contactNumber, customer, address1, address2, city, state, postalCode, country, govtRegistration1, govtRegistration2, govtRegistration3, notes, createUserVendor, showTicketReported, location, createdBy} = req.body
        
        try {

            const VendorSchema = Joi.object({
                vendorCode:Joi.string(),
                vendor_name: Joi.string().required(),
                email:Joi.string().email(),
                contactName:Joi.string(),
                contactPerson: Joi.string(),
                contactNumber: Joi.number(),
                customer: Joi.boolean(),
                address1: Joi.string(),
                address2:Joi.string(),
                city: Joi.string(),
                state: Joi.string(),
                postalCode: Joi.string(),
                country:Joi.string(),
                govtRegistration1: Joi.string(),
                govtRegistration2:Joi.string(),
                govtRegistration3:Joi.string(),
                notes:Joi.string(),
                createUserVendor:Joi.boolean(),
                showTicketReported:Joi.boolean(),
                location:Joi.string(),
                createdBy: Joi.string().required()
            })
            const { error,value } = VendorSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }
            
            const findStatus = await vendorModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findStatus == true){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await vendorModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                vendorCode:vendorCode,
                vendor_name: vendor_name,
                email: email,
                contactName:contactName,
                contactPerson: contactPerson,
                contactNumber: contactNumber,
                customer: customer,
                address1: address1,
                address2:address2,
                city: city,
                state: state,
                postalCode: postalCode,
                country:country,
                govtRegistration1: govtRegistration1,
                govtRegistration2: govtRegistration2,
                govtRegistration3: govtRegistration3,
                notes: notes,
                createUserVendor: createUserVendor,
                showTicketReported:showTicketReported,
                location:location,
                createdBy: createdBy
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

    deleteVendor : async function(req,res){
        try {
            const findStatus = await vendorModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findStatus == true){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await vendorModel.deleteOne({_id:new ObjectId(req.params.id)})
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

    excelUploadVendor: async function(req,res){
        const allRecords =[]
        try{
            
             fs.createReadStream(path.join(__dirname,'../../','/public/uploads/'+req.file.filename))
              .pipe(csv.parse({ headers: true}))
              .on('error', err => console.log(err))
              .on('data', row=> {allRecords.push(row)})
              .on('end', async rowCount => {
                console.log(`${rowCount} rows has parsed`)
                console.log(allRecords)
                try {
                    const allVendor = await vendorModel.insertMany(allRecords)
                    res.status(201).json({
                        message: "vendor created successfully",
                        results: allVendor
                    })
                } catch (error) {
                    return res.status(400).json(error)
                }
              })

        }catch(error){
            res.status(500).json({ statusCode:500, error: error.message });
        }
    },

    downloadExcelVendor : async function (req, res){
       const vendorData = await vendorModel.find()
       var vendors = JSON.parse(JSON.stringify(vendorData))
       var file_header = ['Parent Location', 'Location', 'Location Code', 'Location Description', 'Inventory Location','Default Coordinates','Description'];

        var json_data = new data_exporter({file_header});

        var csv_data = json_data.parse(vendors);

        res.setHeader("Content-Type", "text/csv");

        res.setHeader("Content-Disposition", "attachment; filename=vendor_data.csv");

        res.status(200).end(csv_data);
    }
}

module.exports = vendorOperation