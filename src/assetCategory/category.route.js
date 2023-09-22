'use strict';


const express = require('express');
const router = express.Router();
const { createCategory,updateCategory,getAllCategory} = require('./category.controller')

router.post('/createCategory',createCategory)
router.put('/updateCategory/:id',updateCategory)
 router.get('/fetchAllCategory',getAllCategory)
// router.put('/updateTax/:id',updatetax)
// router.delete('/deleteTax/:id',deletetax)


module.exports = router