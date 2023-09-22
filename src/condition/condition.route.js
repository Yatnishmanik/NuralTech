'use strict';


const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const { createCondition,getAllCondition,updateCondition,deleteCondition, excelUpload, downloadExcelCondition} = require('./condition.controller')

router.post('/createCondition',createCondition)
router.get('/fetchAllCondition',getAllCondition)
router.put('/updateCondition/:id',updateCondition)
router.delete('/deleteCondition/:id',deleteCondition)
router.post('/upload', upload.single('file'),excelUpload)
router.get('/downloadExcelCondition',downloadExcelCondition)


module.exports = router