'use strict';


const express = require('express');
const router = express.Router();
const { createRequestType, getAllRequestType, updateRequestType, deleteRequestType} = require('./requesttype.controller')

router.post('/createRequestType',createRequestType)
 router.get('/getAllRequestType',getAllRequestType)
 router.put('/updateRequestType/:id',updateRequestType)
 router.delete('/deleteRequestType/:id',deleteRequestType)


module.exports = router