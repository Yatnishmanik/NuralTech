const express=require('express');
const router=express.Router();
const {createmanagecontroll,getmanagecontroll,updatemanagecontroll,deletemanagecontroll}=require("./manageworkflow.controller");

//routes

router.post('/create',createmanagecontroll);
router.get('/getdata',getmanagecontroll);
router.put('/update/:id',updatemanagecontroll);
router.delete('/delete/:id',deletemanagecontroll);

module.exports=router;