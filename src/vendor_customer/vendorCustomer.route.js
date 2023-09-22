'use strict';


const express = require('express');
const multer = require('multer');
const upload = multer({ dest: '/tmp' });
const router = express.Router();
const { createVendor,getAllVendor,updateVendor,deleteVendor, excelUploadVendor, downloadExcelVendor} = require('./vendorCustomer.controller')

router.post('/createVendor',createVendor)
router.get('/fetchAllVendor',getAllVendor)
router.put('/updateVendor/:id',updateVendor)
router.delete('/deleteVendor/:id',deleteVendor)
router.post('/excelUploadVendor',upload.single('file'), excelUploadVendor)
router.get('/locationExport',downloadExcelVendor)


module.exports = router