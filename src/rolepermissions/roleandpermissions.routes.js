'use strict';


const express = require('express');
const router = express.Router();
const { createRolePermission, getAllRolePermission, updateRolePermission, deleteRolePermission} = require('./roleandpermissions.controller')

router.post('/createRolePermission',createRolePermission)
router.get('/getAllRolePermission',getAllRolePermission)
router.put('/updateRolePermission/:id',updateRolePermission)
router.delete('/deleteRolePermission/:id',deleteRolePermission)


module.exports = router