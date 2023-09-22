'use strict';


const express = require('express');
const router = express.Router();
const { createPriority,getAllPriority,updatePriority,deletePriority} = require('./priority.controller')

router.post('/createPriority',createPriority)
router.get('/fetchAllPriority',getAllPriority)
router.put('/updatePriority/:id',updatePriority)
router.delete('/deletePriority/:id',deletePriority)


module.exports = router