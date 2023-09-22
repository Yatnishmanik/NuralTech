const express=require('express');
const router=express.Router();
const {create,getdata,updatedata,deletedata} = require("./assetTransfer.controller")

const upload=require('../middlewares/uploadfile');

//<-------------assetTransfer----------------->
router.post('/assetTransfer',upload.single('uploadfile'),create);
router.get('/assetTransfer',getdata);
// router.put('/assetTransfer/:id',upload.single('uploadfile'),updatedata);
router.delete('/assetTransfer/:id',upload.single('uploadfile'),deletedata);

module.exports=router;
