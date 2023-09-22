const Joi = require('joi')
const addInventoryModel = require('./addinventory.model')
const {ObjectId} = require('mongodb')

const addInventoryOperation = {
    

    getAllInventoryReport : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await addInventoryModel.find().limit(limit).skip(skip).
                                 populate('stockPoint.location')
                                 .populate('vendor','vendor_name')
                                 .populate('item','item')
                                 .lean()
            const count = await addInventoryModel.count();
            const page = parseInt(req.query.skip) || 1;
            res.status(200).json({
                "data":result,
                "page":page,
                "limit":limit,
                "totalPages": Math.ceil(count/ limit),
                "totalResults": count,
                "statusCode":200,
            })
          } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
          }
    },  


   
}

module.exports = addInventoryOperation