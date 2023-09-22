'use strict';


const express = require('express');
const router = express.Router();
const { createParameterCheck, getAllParameterCheck, updateParameterCheck, deleteParameterCheck} = require('./parametercheck.controller')

router.post('/createParameterCheck',createParameterCheck)
router.get('/fetchAllParameterCheck',getAllParameterCheck)
router.put('/updateParameterCheck/:id',updateParameterCheck)
router.delete('/deleteParameterCheck/:id',deleteParameterCheck)


module.exports = router