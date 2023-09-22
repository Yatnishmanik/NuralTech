const companyModel = require('./company.model')
const {ObjectId} = require('mongodb')
const companyOperation = {
   createCompany : async function(req, res) {
     try {

        const { comapnyName, companyLegalName, address, gstIn, pan, emailId, phoneNo, cinNo, designation} = req.body;
        const findCompany = await companyModel.findOne({comapnyName:comapnyName}).lean()
            
            if(findCompany !=null){
                res.status(409).json({
                    "statusCode":409,
                    msg:"Already Exist"
                })
            }else{
               const result = await companyModel.create({
                comapnyName: comapnyName,
                companyLegalName: companyLegalName,
                address: address,
                gstIn: gstIn,
                pan: pan,
                emailId: emailId,
                phoneNo: phoneNo,
                cinNo: cinNo,
                designation: designation,

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

   getAllCompany : async function (req, res){
    try {
        let {limit , skip} = req.query;
        limit = +limit ||10;
        skip = +skip ?? 0;

        
        const result = await companyModel.find().limit(limit).skip(skip).lean();
        const count = await companyModel.count();
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

   updateCompany : async function (req, res){
    try {
        const { comapnyName, companyLegalName, address, gstIn, pan, emailId, phoneNo, cinNo, designation} = req.body;
        const findCompany = await companyModel.findById({_id:new ObjectId(req.params.id)}).lean() 
           if(findCompany != null){
              

               const updateCopmany = await companyModel.findByIdAndUpdate({_id:req.params.id},{
                comapnyName: comapnyName,
                companyLegalName: companyLegalName,
                address: address,
                gstIn: gstIn,
                pan: pan,
                emailId: emailId,
                phoneNo: phoneNo,
                cinNo: cinNo,
                designation: designation,
               },
               {new:true}) 
               res.status(201).json({
               "statusCode":201,
               "msg":"Updated successfully",
               "data":updateCopmany
           }) 
           }else{
               res.status(404).json({
                   "statusCode":404,
                   msg:"not exist"
               }) 
           }
          
       
    } catch (error) {
       res.status(500).json({ statusCode:500, error: error.message });
    }
  },

  deleteCompany : async function(req,res){
    try {
        const findCompany = await companyModel.findById({_id:new ObjectId(req.params.id)}).lean()
        
        if(findCompany ==null){
            res.status(404).json({
                "statusCode":404,
                msg:"Not Found"
            })
        }else{
           const result = await companyModel.deleteOne({_id:new ObjectId(req.params.id)})
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

module.exports = companyOperation