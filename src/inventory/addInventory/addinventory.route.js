'use strict';


const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createAddInventory, getAllAddInventory, updateAddInventory, deleteAddInventory, inventoryDetails} = require('./addinventory.controller')


const storage = multer.diskStorage({
    destination: '/tmp',
  
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original file name
    }
  });
  
  const upload = multer({ storage });

router.post('/createAddInventory',upload.single('file'),createAddInventory)
 router.get('/getAllAddInventory',getAllAddInventory)
router.put('/updateAddInventory/:id',upload.single('file'),updateAddInventory)
router.delete('/deleteAddInventory/:id',deleteAddInventory)
router.get('/inventoryDetails', inventoryDetails)


module.exports = router