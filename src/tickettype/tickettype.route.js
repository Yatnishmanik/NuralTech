'use strict';


const express = require('express');
const router = express.Router();
const { createTicketType,getAllTicketType,updateTicketType,deleteTicketType} = require('./tickettype.controller')

router.post('/createTicketType',createTicketType)
router.get('/getAllTicketType',getAllTicketType)
router.put('/updateTicketType/:id',updateTicketType)
router.delete('/deleteTicketType/:id',deleteTicketType)


module.exports = router