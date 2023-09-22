'use strict';


const express = require('express');
const router = express.Router();
const { createCountry,getAllCountry,updateCountry,deleteCountry} = require('./country.controller')

router.post('/createCountry',createCountry)
router.get('/fetchAllCountry',getAllCountry)
router.put('/updateCountry/:id',updateCountry)
router.delete('/deleteCountry/:id',deleteCountry)


module.exports = router