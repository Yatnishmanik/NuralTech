const Joi = require('joi')
const rolePermissionModel = require('./roleandpermissions.models')
const {ObjectId} = require('mongodb')
const rolePermissionOperation = {
    createRolePermission : async function(req, res){
        try {
            const rolePermissionSchema = Joi.object({
                roleName:Joi.string().required(),
                description: Joi.string(),
                roleType: Joi.string().required(),
                category:Joi.array(),
                assetLocations: Joi.array().required(),
                status: Joi.array(),
                permission: Joi.string().required(),
                allowInRoleVendor: Joi.string(),
                showallottedAssets: Joi.string(),
                defaultScreen: Joi.string(),
                
            })
            const { error,value } = rolePermissionSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

               const {roleName, description, roleType, category, assetLocations, status, permission, allowInRoleVendor, showallottedAssets, defaultScreen} = req.body
               const result = await rolePermissionModel.create({
                roleName: roleName,
                description: description,
                roleType: roleType,
                category: category,
                assetLocations: assetLocations,
                status: status,
                permission: permission,
                allowInRoleVendor: allowInRoleVendor,
                showallottedAssets: showallottedAssets,
                defaultScreen: defaultScreen
                })
                res.status(201).json({
                    "statusCode":201,
                    "msg":"created successfully",
                    "data":result
                })
            
        } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
        }
      },

    getAllRolePermission : async function(req, res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;
             
            const result = await rolePermissionModel.find().limit(limit).skip(skip)
            .populate('category.categoryId','name')
            .populate('assetLocations.assetLocationId','parentLocation')
            .populate('status.statusId','statusName').lean();
            const count = await rolePermissionModel.count();
            const page = parseInt(req.query.skip) || 1;

            res.status(200).json({
                "statusCode":200,
                "data":result,
                "page":page,
                "limit":limit,
                "totalPages": Math.ceil(count / limit),
                "totalResults": count,
            })
          } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
          }
    },  

    updateRolePermission : async function(req,res){
        try {
            
            const rolePermissionSchema = Joi.object({
                roleName:Joi.string().required(),
                description: Joi.string(),
                roleType: Joi.string().required(),
                category:Joi.array(),
                assetLocations: Joi.array().required(),
                status: Joi.array(),
                permission: Joi.string().required(),
                allowInRoleVendor: Joi.string(),
                showallottedAssets: Joi.string(),
                defaultScreen: Joi.string(),
                
            })
            const { error,value } = rolePermissionSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    error:error.details[0].message
               })
            }

            const {roleName, description, roleType, category, assetLocations, status, permission, allowInRoleVendor, showallottedAssets, defaultScreen} = req.body
            const findRolePermission = await rolePermissionModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findRolePermission ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await rolePermissionModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                roleName: roleName,
                description: description,
                roleType: roleType,
                category: category,
                assetLocations: assetLocations,
                status: status,
                permission: permission,
                allowInRoleVendor: allowInRoleVendor,
                showallottedAssets: showallottedAssets,
                defaultScreen: defaultScreen
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

    deleteRolePermission : async function(req,res){
        try {
            const findRolePermission = await rolePermissionModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findRolePermission ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await rolePermissionModel.deleteOne({_id:new ObjectId(req.params.id)})
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

module.exports = rolePermissionOperation