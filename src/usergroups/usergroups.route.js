'use strict';


const express = require('express');
const router = express.Router();
const { createUserGroup, getAllUserGroup} = require('./usergroup.controller')

router.post('/createUserGroup',createUserGroup)
 router.get('/getAllUserGroup',getAllUserGroup)
// router.put('/updateTicketType/:id',updateTicketType)
// router.delete('/deleteTicketType/:id',deleteTicketType)


module.exports = router