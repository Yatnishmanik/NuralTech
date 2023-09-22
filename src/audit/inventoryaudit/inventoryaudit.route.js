'use strict';


const express = require('express');
const router = express.Router();
const { createInventoryAudit,getAllInventoryAudit, updateInventoryAudit, deleteInventoryAudit} = require('./inventoryaudit.controller')

 router.post('/createInventoryAudit',createInventoryAudit)
 router.get('/fetchAllInventoryAudit',getAllInventoryAudit)
 router.put('/updateInventoryAudit/:id',updateInventoryAudit)
 router.delete('/deleteInventoryAudit/:id',deleteInventoryAudit)

module.exports = router