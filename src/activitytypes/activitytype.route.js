'use strict';


const express = require('express');
const router = express.Router();
const { createActivityType, getAllActivityType, updateActivityType, deleteActivityType} = require('./activitytype.controller')

router.post('/createActivityType',createActivityType)
router.get('/fetchAllActivityType',getAllActivityType)
router.put('/updateActivityType/:id',updateActivityType)
router.delete('/deleteActivityType/:id',deleteActivityType)


module.exports = router