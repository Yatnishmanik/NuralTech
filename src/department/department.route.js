'use strict';


const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const { createDepartment,getAllDepartment,updateDepartment,deleteDepartment, excelUpload, downloadExcelDepartment} = require('./department.controller')

router.post('/createDepart',createDepartment)
router.get('/fetchAllDepart',getAllDepartment)
router.put('/updateDepartment/:id',updateDepartment)
router.delete('/deleteDepart/:id',deleteDepartment)
// router.post('/createSubDepart',createSubDepartment)
// router.get('/fetchAllSubDepart',getAllSubDepartment)
// router.put('/updateSupDepart/:id',updateSubDepartment)
// router.delete('/deleteSubDepart/:id',deleteSubDepartment)

router.post('/upload', upload.single('file'),excelUpload)
router.get('/downloadExcelDepartment',downloadExcelDepartment)


module.exports = router