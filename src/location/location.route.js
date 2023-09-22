'use strict';


const express = require('express');
const multer = require('multer');
const upload = multer({ dest: '/tmp' });
const router = express.Router();
const { createLocation,getAllLocation,updateLocation,deleteLocation, excelUpload, downloadExcelLocation} = require('./location.controller')

router.post('/createLocation',createLocation)
router.get('/fetchAllLocation',getAllLocation)
router.put('/updateLocation/:id',updateLocation)
router.delete('/deleteLocation/:id',deleteLocation)
router.post('/uploadLocation',upload.single('file'), excelUpload)
router.get('/locationExport',downloadExcelLocation)



module.exports = router