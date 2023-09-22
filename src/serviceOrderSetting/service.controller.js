
const Joi = require('joi');
const { ObjectId } = require('mongodb')
const serviceOrderModel = require('./service.model')
const controller = { 

    //<-------------------CreateData----------------------->/
    async createData(req, res) {
        try {
            const manageschema = Joi.object({
                request: Joi.string(),
                serviceOrder: Joi.string(),
                vendor: Joi.string().required(),
                deliveryDate: Joi.date().required(),
                deliveryLocation: Joi.string().required(),
                serviceOrderDate: Joi.date().required(),
                paymentTerms: Joi.string().required(),
                amountsInwords: Joi.string(),
                serviceCC: Joi.string(),
                authorizedSignature: Joi.string(),
                sendEmail: Joi.boolean(),
                items: Joi.array().items(
                    Joi.object({
                        description: Joi.string().required(),
                        remarks: Joi.string(),
                        quantity: Joi.number().required(),
                        unit: Joi.number(),
                        rate: Joi.number().required(),
                        discount: Joi.number(),
                        taxtype: Joi.string()
                    })
                ),
            });
            const { error } = manageschema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    error: error.details[0].message
                })
            }
            console.log(req.files);
            console.log(req.body);
            const data = new serviceOrderModel({
                request: req.body.request,
                serviceOrder: req.body.serviceOrder,
                vendor: req.body.vendor,
                deliveryDate: req.body.deliveryDate,
                deliveryLocation: req.body.deliveryLocation,
                serviceOrderDate: req.body.serviceOrderDate,
                paymentTerms: req.body.paymentTerms,
                uploadFilePath: req.files.upload1[0].path,
                amountsInwords: req.body.amountsInwords,
                serviceCC: req.body.serviceCC,
                authorizedSignature: req.body.authorizedSignature,
                additionInfoUploadPath: req.files.upload2[0].path,
                sendEmail: req.body.sendEmail,
                items: req.body.items
            });
            console.log(data)
            const result = await data.save();
            res.status(201).json({
                statusCode: 201,
                msg: "successfully created",
                data: result
            })
        }
        catch (error) {
            res.status(500).json({ statusCode: 500, error: error.message });
        }
    },


    //<-------------------getdata-------------------->
    async getData(req, res) 
    {
        try {
                let {limit , skip} = req.query;
                limit = +limit ||10;
                skip = +skip ?? 0;
                const result = await serviceOrderModel.find();
                const count = await serviceOrderModel.count();
                const page = parseInt(req.query.skip) || 1;
                console.log(result);
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




    //<-------------------updateData-------------------->
    async updateData(req, res) {
        try {
            
            const manageschema = Joi.object({
                request: Joi.string(),
                serviceOrder: Joi.string(),
                vendor: Joi.string(),
                deliveryDate: Joi.date(),
                deliveryLocation: Joi.string(),
                serviceOrderDate: Joi.date(),
                paymentTerms: Joi.string(),
                amountsInwords: Joi.string(),
                serviceCC: Joi.string(),
                authorizedSignature: Joi.string(),
                sendEmail: Joi.boolean(),
                items: Joi.array().items(
                    Joi.object({
                        description: Joi.string(),
                        remarks: Joi.string(),
                        quantity: Joi.number(),
                        unit: Joi.number(),
                        rate: Joi.number(),
                        discount: Joi.number(),
                        taxtype: Joi.string()
                    })
                ),
            });
            const { error } = manageschema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    error: error.details[0].message
                })
            }
            
            console.log(req.files);
            console.log(req.body);
            const data = await serviceOrderModel.findByIdAndUpdate({ _id: new ObjectId(req.params.id) }, {
                request: req.body.request,
                serviceOrder: req.body.serviceOrder,
                vendor: req.body.vendor,
                deliveryDate: req.body.deliveryDate,
                deliveryLocation: req.body.deliveryLocation,
                serviceOrderDate: req.body.serviceOrderDate,
                paymentTerms: req.body.paymentTerms,
                uploadFilePath: req.files.upload1[0].path,
                amountsInwords: req.body.amountsInwords,
                serviceCC:req.body.serviceCC,
                authorizedSignature: req.body.authorizedSignature,
                additionInfoUploadPath: req.files.upload2[0].path,
                sendEmail: req.body.sendEmail,
                items: req.body.items
            }, { new: true });
            console.log(data)
            res.status(201).json({
                statusCode: 201,
                msg: "successfully updated",
                data: data
            })
        }
        catch (error) {
            res.status(500).json({ statusCode: 500, error: error.message });
        }
    },




    //<-------------------deleteData-------------------->
    async deleteData(req, res) {
        try {
            const findManageUser = await serviceOrderModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findManageUser ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await serviceOrderModel.deleteOne({_id:new ObjectId(req.params.id)})
                res.status(201).json({
                    "statusCode":201,
                    "msg":"Delete successfully",
                    "data":result
                })
            }
        } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
        }
    }
}
module.exports = controller;