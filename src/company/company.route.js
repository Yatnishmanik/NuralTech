'use strict';


const express = require('express');
const router = express.Router();
const { createCompany,getAllCompany,updateCompany,deleteCompany} = require('./company.controller')

router.post('/createCompany',createCompany)
router.put('/updateCompany/:id',updateCompany)
router.get('/fetchAllCompany',getAllCompany)
 router.delete('/deleteCompany/:id',deleteCompany)


module.exports = router