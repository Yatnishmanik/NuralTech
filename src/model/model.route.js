'use strict';


const express = require('express');
const router = express.Router();
const { createModel,getAllModel,updateModel,deleteModel} = require('./model.controller')

router.post('/createModel',createModel)
router.get('/fetchAllModel',getAllModel)
router.put('/updateModel/:id',updateModel)
router.delete('/deleteModel/:id',deleteModel)


module.exports = router