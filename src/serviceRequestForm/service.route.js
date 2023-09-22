const express= require('express');
const router= express.Router();
const upload =require('../middlewares/uploadfile');

const {createService,getService,updateService,deleteService}= require('./service.controller')


router.post('/create',upload.single("upload1"),createService);
router.get('/getData',getService);
router.put('/updateData/:id',upload.single("upload1"),updateService);
router.delete('/deleteData/:id',deleteService);

module.exports= router;
