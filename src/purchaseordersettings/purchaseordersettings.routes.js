'use strict';


const express = require('express');
const router = express.Router();
const { createPurchaseOrder,getAllPurchaseOrder,updatePurchaseOrder,deletePurchaseOrder} = require('./purchaseordersettings.controller')

router.post('/createPurchaseOrder',createPurchaseOrder)
router.get('/getAllPurchaseOrder',getAllPurchaseOrder)
router.put('/updatePurchaseOrder/:id',updatePurchaseOrder)
router.delete('/deletePurchaseOrder/:id',deletePurchaseOrder)


module.exports = router