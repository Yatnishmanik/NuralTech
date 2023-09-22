'use strict';


const express = require('express');
const router = express.Router();
const { createCurrency,getAllCurrency,updateCurrency,deleteCurrency} = require('./currency.controller')

router.post('/createCurrency',createCurrency)
router.get('/fetchAllCurrency',getAllCurrency)
router.put('/updateCurrency/:id',updateCurrency)
router.delete('/deleteCurrency/:id',deleteCurrency)


module.exports = router