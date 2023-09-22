'use strict';


const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createMoveInventory, getAllMoveInventory, updateMoveInventory, deleteMoveInventory} = require('./moveInventory.controller')


const storage = multer.diskStorage({
    destination: '/tmp',
  
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original file name
    }
  });
  
  const upload = multer({ storage });

router.post('/createMoveInventory',upload.single('file'),createMoveInventory)
router.get('/getAllMoveInventory',getAllMoveInventory)
router.put('/updateMoveInventory/:id',upload.single('file'),updateMoveInventory)
router.delete('/deleteMoveInventory/:id',deleteMoveInventory)


module.exports = router