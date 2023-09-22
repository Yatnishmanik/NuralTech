const express =require('express');
const router= express.Router();
const upload= require('../middlewares/uploadfile')
const {createData,getData,updateData,deleteData}=require("./service.controller");


router.post('/create',upload.fields([{ name: 'upload1' }, { name: 'upload2' }]),createData);
router.get('/getdata',getData);
router.put('/update/:id',upload.fields([{ name: 'upload1' }, { name: 'upload2' }]),updateData);
router.delete('/delete/:id',deleteData);
module.exports=router;

