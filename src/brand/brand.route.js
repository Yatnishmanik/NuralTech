'use strict';


const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const { createBrand,getAllBrand,updateBrand,deleteBrand, excelUpload, downloadExcelBrand} = require('./brand.controller')


router.post('/createBrand',createBrand)
router.get('/fetchAllBrand',getAllBrand)
router.put('/updateBrand/:id',updateBrand)
router.delete('/deleteBrand/:id',deleteBrand)
router.post('/upload', upload.single('file'),excelUpload)
router.get('/downloadExcelBrand',downloadExcelBrand)


module.exports = router