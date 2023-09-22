'use strict';


const express = require('express');
const router = express.Router();
const { createInventoryMovement,getAllInventoryMovement,updateInventoryMovement,deleteInventoryMovement} = require('./inventorymovement.controller')

router.post('/createInventoryMovement',createInventoryMovement)
router.get('/getAllInventoryMovement',getAllInventoryMovement)
router.put('/updateInventoryMovement/:id',updateInventoryMovement)
router.delete('/deleteInventoryMovement/:id',deleteInventoryMovement)


module.exports = router