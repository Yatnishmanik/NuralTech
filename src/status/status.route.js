'use strict';


const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const { createStatus,getAllStatus,updateStatus,deleteStatus, excelUpload, downloadExcelStatus} = require('./status.controller')

router.post('/createStatus',createStatus)
router.get('/fetchAllStatus',getAllStatus)
router.put('/updateStatus/:id',updateStatus)
router.delete('/deleteStatus/:id',deleteStatus)
router.post('/upload', upload.single('file'),excelUpload)
router.get('/downloadExcelStatus',downloadExcelStatus)


module.exports = router