'use strict';


const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createDrawInventory, getAllDrawInventory,updateDrawInventory, deleteDrawInventory } = require('./drawInventory.controller')


const storage = multer.diskStorage({
    destination: '/tmp',
  
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original file name
    }
  });
  
  const upload = multer({ storage });

router.post('/createDrawInventory',upload.single('file'),createDrawInventory)
router.get('/getAllDrawInventory',getAllDrawInventory)
router.put('/updateDrawInventory/:id',upload.single('file'),updateDrawInventory)
router.delete('/deleteDrawInventory/:id',deleteDrawInventory)


module.exports = router