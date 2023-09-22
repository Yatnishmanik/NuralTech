const countryModel = require('./country.model')
const {ObjectId} = require('mongodb')
const countryOperation = {
  createCountry : async function(req, res){
    try {
        const findCountry = await countryModel.findOne({country_name:req.body.country_name}).lean()
        if(findCountry !=null){
            res.status(409).json({
                "statusCode":409,
                msg:"Already Exist"
            })
        }else{
           const result = await countryModel.create({
            country_name:req.body.country_name
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
  
  getAllCountry : async function(req, res){
    try {
        let {limit , skip} = req.query;
        limit = +limit ||10;
        skip = +skip ?? 0;

        
        const result = await countryModel.find().limit(limit).skip(skip).lean();
        const count = await countryModel.count();
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

  updateCountry : async function(req,res){
    try {
        const findCountry = await countryModel.findById({_id:new ObjectId(req.params.id)}).lean()
        
        if(findCountry ==null){
            res.status(404).json({
                "statusCode":404,
                msg:"Not Found"
            })
        }else{
           const result = await countryModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
            country_name:req.body.country_name,

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

deleteCountry : async function(req,res){
    try {
        const findCountry = await countryModel.findById({_id:new ObjectId(req.params.id)}).lean()
        
        if(findCountry ==null){
            res.status(404).json({
                "statusCode":404,
                msg:"Not Found"
            })
        }else{
           const result = await countryModel.deleteOne({_id:new ObjectId(req.params.id)})
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

module.exports = countryOperation