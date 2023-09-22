const currencyModel = require('./currency.model')
const {ObjectId} = require('mongodb')
const currencyOpreation = {
    createCurrency : async function(req, res){
        try {
            const findCurrency = await currencyModel.findOne({currency_name:req.body.currency_name,currency_sysmbol:req.body.currency_sysmbol}).lean()
            if(findCurrency !=null){
                res.status(409).json({
                    "statusCode":409,
                    msg:"Already Exist"
                })
            }else{
               const result = await currencyModel.create({
                currency_name:req.body.currency_name,
                currency_sysmbol: req.body.currency_sysmbol
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

    getAllCurrency : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;
    
            
            const result = await currencyModel.find().limit(limit).skip(skip).lean();
            const count = await currencyModel.count();
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

    updateCurrency : async function(req,res){
        try {
            const findCurrency = await currencyModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findCurrency ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await currencyModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                currency_name:req.body.currency_name,
                currency_sysmbol: req.body.currency_name
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

    deleteCurrency : async function(req,res){
        try {
            const findCurrency = await currencyModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findCurrency ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await currencyModel.deleteOne({_id:new ObjectId(req.params.id)})
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
}

module.exports = currencyOpreation