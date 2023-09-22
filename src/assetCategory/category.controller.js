const { response } = require('express');
const assetCategoryModel = require('./category.model')
const {ObjectId} = require('mongodb')

const categoryOperation = {
   createCategory : async function(req, res){
   
    
     try {
        const findCategory = await assetCategoryModel.findOne({categoryName:req.body.categoryName}).lean().exec()
        if(findCategory != null){
            res.status(409).json({
                "statusCode":409,
                msg:"Already Exist"
            })   
        }else{
            if(req.body.parentCategory == ""){
                const result = await assetCategoryModel.create({
                    categoryName:req.body.categoryName,
                    categoryCode:req.body.categoryCode,
                    cascade:req.body.cascade,
                    allowAutoExtend:req.body.allowAutoExtend,
                    endLife:req.body.endLife,
                    scrapValue:req.body.scrapValue,
                    depreciation:req.body.depreciation,
                    incomeTaxDepreciation:req.body.incomeTaxDepreciation,
                    details:req.body.details,
                    defaultVendor:req.body.defaultVendor,
                    autoAssign:req.body.autoAssign
                 })
                 res.status(201).json({
                    "statusCode":201,
                    "msg":"created successfully",
                    "data":result
                })
            }else{
                const result = await assetCategoryModel.create({
                    parentCategory:req.body.parentCategory,
                    categoryName:req.body.categoryName,
                    categoryCode:req.body.categoryCode,
                    cascade:req.body.cascade,
                    allowAutoExtend:req.body.allowAutoExtend,
                    endLife:req.body.endLife,
                    scrapValue:req.body.scrapValue,
                    depreciation:req.body.depreciation,
                    incomeTaxDepreciation:req.body.incomeTaxDepreciation,
                    details:req.body.details,
                    defaultVendor:req.body.defaultVendor,
                    autoAssign:req.body.autoAssign
                 })
    
                 res.status(201).json({
                    "statusCode":201,
                    "msg":"created successfully",
                    "data":result
                })
            }
            
             
            //  const data=   await assetCategoryModel.findByIdAndUpdate(req.body.parentCategoryId, {$push: {childCategoryId: result._id}}) 
            //    res.status(201).json({
            //     "statusCode":201,
            //      result:result
            //    })
                
        }
     } catch (error) {
        res.status(500).json({ statusCode:500, error: error.message });
     }
   },

   updateCategory: async function (req, res){
     try {
           
        const checkCategory = await assetCategoryModel.findById({_id:new ObjectId(req.params.id)}).lean()
          if(!checkCategory){
            res.status(404).json({
                "statusCode":404,
                msg:"Not Found"
            })
          } else{
            if(req.body.parentCategory == ""){
                const result = await assetCategoryModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                    categoryName:req.body.categoryName,
                    categoryCode:req.body.categoryCode,
                    cascade:req.body.cascade,
                    allowAutoExtend:req.body.allowAutoExtend,
                    endLife:req.body.endLife,
                    scrapValue:req.body.scrapValue,
                    depreciation:req.body.depreciation,
                    incomeTaxDepreciation:req.body.incomeTaxDepreciation,
                    details:req.body.details,
                    defaultVendor:req.body.defaultVendor,
                    autoAssign:req.body.autoAssign
                 },{new:true})
    
                 res.status(201).json({
                    "statusCode":201,
                    "msg":"updated successfully",
                    "data":result
                })
            }else{
                const result = await assetCategoryModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                    parentCategory:req.body.parentCategory,
                    categoryName:req.body.categoryName,
                    categoryCode:req.body.categoryCode,
                    cascade:req.body.cascade,
                    allowAutoExtend:req.body.allowAutoExtend,
                    endLife:req.body.endLife,
                    scrapValue:req.body.scrapValue,
                    depreciation:req.body.depreciation,
                    incomeTaxDepreciation:req.body.incomeTaxDepreciation,
                    details:req.body.details,
                    defaultVendor:req.body.defaultVendor,
                    autoAssign:req.body.autoAssign
                 },{new:true})
    
                 res.status(201).json({
                    "statusCode":201,
                    "msg":"updated successfully",
                    "data":result
                })
            }
            
            

          }

     } catch (error) {
        res.status(500).json({ statusCode:500, error: error.message });
     }
   },

   getAllCategory : async function (req, res){
    try {

        let {limit,skip,searchKey=""} = req.query || {};

        limit = +limit ||10;
        skip = +skip ?? 0;

        
        
         const result = await assetCategoryModel.find()
         .populate("parentCategory", "categoryName")
         
         .populate("defaultVendor", "vendor_name")
         .limit(limit)
         .skip(skip)
         .lean();

         let total = await assetCategoryModel.count();
         const page = parseInt(req.query.skip) || 1;

         if(result.length<1){
            return res.status(404).json({
                statusCode:404,
                message:"categories not found"
             })
         }
         return res.status(200).json({
            statusCode:200,
            data:result,
            "page":page,
            "limit":limit,
            "totalPages": Math.ceil(total / limit),
            "totalResults": total
         })
    } catch (error) {
        console.log("error",error)
        return res.status(500).json({ statusCode:500, error: error.message });
    }
   }
}



module.exports = categoryOperation