'use strict';


const express = require('express');
const router = express.Router();
const { createManageUser,updateManagementUser,deleteManageUser, getAllManageUser} = require('./manageuser.controller')

router.post('/createManageUser',createManageUser)
 router.get('/getAllManageUser',getAllManageUser)
 router.put('/updateManagementUser/:id',updateManagementUser)
 router.delete('/deleteManageUser/:id',deleteManageUser)


module.exports = router