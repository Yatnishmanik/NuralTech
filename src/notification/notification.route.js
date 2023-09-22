const express = require('express');
const router = express.Router();

const {getnotification,updatenotification} = require('./notification.controller');
router.get('/getnotification/:id',getnotification);
router.put('/updatenotifications/:id',updatenotification)
module.exports= router;
