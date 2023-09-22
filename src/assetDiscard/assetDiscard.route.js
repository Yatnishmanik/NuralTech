const express=require('express');
const router=express.Router();
const {discardAsset,getdata,updatedata,deletedata}=require('./assetDiscard.controller')

const upload=require('../middlewares/uploadfile');

//<--------------discard route----------------->

router.post('/assetdiscard',upload.single('file'),discardAsset);
router.get('/assetdiscard',getdata);
router.delete('/assetdiscard/:id',deletedata);

module.exports=router;
