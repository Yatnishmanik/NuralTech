'use strict';


const express = require('express');
const router = express.Router();
const { createUnit,getAllUnit,updateUnit,deleteUnit} = require('./unit.contoller')

router.post('/createUnit',createUnit)
router.get('/fetchAllUnit',getAllUnit)
router.put('/updateUnit/:id',updateUnit)
router.delete('/deleteUnit/:id',deleteUnit)


module.exports = router