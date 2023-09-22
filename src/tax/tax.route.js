'use strict';


const express = require('express');
const router = express.Router();
const { createtax,getAlltax,updatetax,deletetax} = require('./tax.controller')

router.post('/createTax',createtax)
router.get('/fetchAllTax',getAlltax)
router.put('/updateTax/:id',updatetax)
router.delete('/deleteTax/:id',deletetax)


module.exports = router