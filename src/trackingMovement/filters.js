const transferSchema = require( '../assetTransfer/assetTransfer.model');
const assetschema = require('../addAsset/addAsset.model');
const express = require('express');
const router = express.Router();

  router.get('/fetchLocationFilter',async(req,res)=>{
    try {
        let {limit , skip} = req.query;
        limit = +limit ||10;
        skip = +skip ?? 0;                      
        const result = await transferSchema.find({newlocation:req.query.filter})
                                    .populate('assetInfo')
                                    .populate('newlocation')
                                    .populate('transferStatus')
                                    .populate('condition')
                                    .limit(limit)
                                    .skip(skip)
                                    .lean();
                          
        const count = await transferSchema.count();
        const page = parseInt(req.query.skip) || 0;
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
  }),
  
  ///<----------------fetch all user filter--------------------------------->

  router.get('/fetchUserFilter',async(req,res)=>{
    try {
        let {limit , skip} = req.query;
        limit = +limit ||10;
        skip = +skip ?? 0;                      
        const result = await transferSchema.find({user:req.query.filter})
                                    .populate('assetInfo')
                                    .populate('newlocation')
                                    .populate('transferStatus')
                                    .populate('condition')
                                    .limit(limit)
                                    .skip(skip)
                                    .lean();
                          
        const count = await transferSchema.count();
        const page = parseInt(req.query.skip) || 0;
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
  }),
  

module.exports = router;