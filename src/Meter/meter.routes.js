'use strict';


const express = require('express');
const router = express.Router();
const { createMeter,getAllMeter,updateMeter,deleteMeter} = require('./meter.controller')

router.post('/createMeter',createMeter)
router.get('/fetchAllMeter',getAllMeter)
router.put('/updateMeter/:id',updateMeter)
router.delete('/deleteMeter/:id',deleteMeter)


module.exports = router