
const express=require('express');
const router=express.Router();
const mailer = require('../Utils/mailer');

const {create,getData,updateData,deleteData,updatePendingActivity,getPendingAcitivity,dueDateTracking,withassetSchedule}=require('./assetSchedule.controller');
const upload=require('../middlewares/uploadfile')

router.post('/assetSchedule',upload.single('file'),create);
router.get('/assetSchedule',getData);
router.put('/assetSchedule/:id',upload.single('file'),updateData);
router.delete('/assetSchedule/:id',deleteData);
router.put('/update-Pending-Activity/:id',upload.single('file'),updatePendingActivity);
router.get('/PendingActivity',getPendingAcitivity);
router.get('/dueDateTracking',dueDateTracking);
router.get('/withasset',withassetSchedule)
router.post('/sendEmail',mailer);

module.exports=router;

