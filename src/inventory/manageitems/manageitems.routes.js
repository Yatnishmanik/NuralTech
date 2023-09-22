'use strict';


const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createManageItems, getAllManageItems, updateManageItems, deleteManageItems, reorderItemLevel, getAllReorderItemLevel} = require('./manageitems.controller')


const storage = multer.diskStorage({
    destination: '/tmp',
  
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original file name
    }
  });
  
  const upload = multer({ storage });

router.post('/createManageItems',upload.single('file'),createManageItems)
router.get('/fetchAllManageItems',getAllManageItems)
router.put('/updateManageItems/:id',upload.single('file'),updateManageItems)
router.delete('/deleteManageItems/:id',deleteManageItems)
router.post('/reorderItemLevel', reorderItemLevel)
router.get('/getAllReorderItemLevel', getAllReorderItemLevel)


module.exports = router