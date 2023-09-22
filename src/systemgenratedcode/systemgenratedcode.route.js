'use strict';


const express = require('express');
const router = express.Router();
const { createSystemgencode,getdatasystemgencode,updatesystemGencode,deletesystemGencode} = require('./systemgenratedcode.controller')

 router.post('/createGencode',createSystemgencode);
 router.get('/getsystemGencode',getdatasystemgencode);
 router.put('/updatesystemGencode/:id',updatesystemGencode);
 router.delete('/deletesystemGencode/:id',deletesystemGencode);

module.exports = router