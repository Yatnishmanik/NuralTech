'use strict';


const express = require('express');
const router = express.Router();
const { createReason,getAllReason,updateReason,deleteReason} = require('./reason.controller')

router.post('/createReason',createReason)
router.get('/fetchAllReason',getAllReason)
router.put('/updateReason/:id',updateReason)
router.delete('/deleteReason/:id',deleteReason)


module.exports = router