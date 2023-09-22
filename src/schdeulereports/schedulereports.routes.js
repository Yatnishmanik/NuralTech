'use strict';


const express = require('express');
const router = express.Router();
const { createScheduleReport, getAllScheduleReport} = require('./schedulereports.controller')

 router.post('/createScheduleReport',createScheduleReport)
 router.get('/getAllScheduleReport/:type',getAllScheduleReport)
// router.put('/updateRolePermission/:id',updateRolePermission)
// router.delete('/deleteRolePermission/:id',deleteRolePermission)


module.exports = router