'use strict';


const express = require('express');
const router = express.Router();
const { createManageAudit, getAllManageAudit, updateManageAudit, deleteManageAudit, pendingAudit} = require('./manageaudit.controllers')

router.post('/createManageAudit',createManageAudit)
router.get('/fetchAllManageAudit',getAllManageAudit)
router.put('/updateManageAudit/:id',updateManageAudit)
router.delete('/deleteManageAudit/:id',deleteManageAudit)
 router.get('/pendingAudit', pendingAudit)


module.exports = router