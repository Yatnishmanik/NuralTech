const Joi =require('joi')
const {ObjectId} = require('mongodb')
const manageworkflow=require('./manageworkflow.model')
const managecontroller={


    /// <----------- Creation of ManageworkFlow ---------->
    async createmanagecontroll(req,res){
        try {
            const manageschema = Joi.object({
                role: Joi.array().items(Joi.string().min(3)).required(),
                workFlowname: Joi.string(),
                form: Joi.string().required(),
                workFlow: Joi.array(),
                workflowLevel: Joi.array(),
            });
            const { error } = manageschema.validate(req.body);
            if (error) {
            return res.status(400).json({
                error:error.details[0].message
            })
        }
            const {role,workFlowname,form,workFlow,workflowLevel} = req.body;
            const data = new manageworkflow({
                role:role,
                workFlowname:workFlowname,
                form:form,
                workflow:workFlow,
                workflowLevel:workflowLevel,
              });
              const result=await data.save();
              res.status(201).json({
                statusCode:201,
                msg:"successfully created",
                data:result
              })
    }
    catch(error) {
        res.status(500).json({ statusCode:500, error: error.message });
    }
  },



  ///<-------------Get allData of Manage Workflow ---------->
    async getmanagecontroll(req,res){
        try {
            let {limit , skip} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;

            const result = await manageworkflow.find().limit(limit).skip(skip).lean();
            const count = await manageworkflow.count();
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



    //<-------------Update manage workflow  ------------->
    async updatemanagecontroll(req,res){
        try {  
            const manageschema = Joi.object({
                role: Joi.array().required(),
                workFlowname: Joi.string(),
                form: Joi.string().required(),
                workFlow: Joi.array(),
                workflowLevel: Joi.array(),
            });
            const { error } = manageschema.validate(req.body);
            if (error) {
            return res.status(400).json({
                error:error.details[0].message
            })
           }
            const findData=await manageworkflow.findById({_id:new ObjectId(req.params.id)});
            if(findData == true){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }
            else{
            const result = await manageworkflow.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
            role: req.body.role,
            workFlowname: req.body.workFlowname,
            form: req.body.form,
            workFlow: req.body.workFlow,
            workflowLevel: req.body.workflowLevel,
                },{new:true})
                res.status(201).json({
                    "statusCode":201,
                    "msg":"updated successfully",
                    "data":result
                })
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }

    },



    //<-------------delete manageworkflow --------------->
    async deletemanagecontroll(req,res){
        try {
            const findScheduleReport = await manageworkflow.findById({_id:new ObjectId(req.params.id)}).lean()
            if(findScheduleReport ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
                await manageworkflow.deleteOne({_id:new ObjectId(req.params.id)})
                res.status(201).json({
                    "statusCode":201,
                    "msg":"Delete successfully",
                    
                })
            }
        } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
        }

    } 
}
module.exports=managecontroller;
