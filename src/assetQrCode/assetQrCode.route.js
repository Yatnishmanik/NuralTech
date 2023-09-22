const express= require('express');
const router = express.Router();
const {QrCodeGenration,barcodeGen}= require('./assetQrCode.controller');

router.post('/QrCode/:id',QrCodeGenration);
router.get('/barcodeGen',barcodeGen);

module.exports= router;