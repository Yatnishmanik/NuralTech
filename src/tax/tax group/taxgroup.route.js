'use strict';


const express = require('express');
const router = express.Router();
const { createtaxgroup,getAlltaxgroup,updatetaxgroup,deletetaxgroup} = require('./taxgroup.controller')

router.post('/createTaxgroup',createtaxgroup)
router.get('/fetchAllTaxgroup',getAlltaxgroup)
router.put('/updateTaxgroup/:id',updatetaxgroup)
router.delete('/deleteTaxgroup/:id',deletetaxgroup)


module.exports = router