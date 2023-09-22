'use strict';


const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createTicket, getAllTicket, updateTicket, deleteTicket, updateTicketCheckIn, updateTicketHold, updateTicketStatus, getAllTicketStatus} = require('./ticket.controller')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './tmp');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage });

router.post('/createTicket',upload.single('file'),createTicket)
router.get('/fetchAllTicket',getAllTicket)
router.put('/updateTicket/:id',upload.single('file'),updateTicket)
router.delete('/deleteTicket/:id',deleteTicket)
router.patch('/ticketCheckInCheckOut/:id', updateTicketCheckIn)
router.patch('/ticketHoldRelease/:id', updateTicketHold)
router.patch('/ticketStatusUpdate/:id', updateTicketStatus)
router.get('/getTicketStatus', getAllTicketStatus)

module.exports = router