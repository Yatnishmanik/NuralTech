const { ObjectId } = require('mongodb')
const addAssetSchema = require('../addAsset/addAsset.model')
const { createCanvas } = require('canvas');
const JsBarcode = require('jsbarcode');

const QRCode = require("qrcode");


const controller = {

  async QrCodeGenration(req, res) {
    const findData = await addAssetSchema.findById({ _id: new ObjectId(req.params.id) });
    console.log(findData);
    if(findData){
      const data = {
        assetName: findData.assetName,
        assetCode: findData.assetCode
      }
      let stringData = JSON.stringify(data);
  
      // Print the QR code to terminal
      QRCode.toString(stringData, { type: "terminal" }, function (err, QRcode) {
        if (err) return console.log("error occurred");
        // Printing the generated code
        console.log(QRcode);
      });
  
      // Converting the data into base64 ans send 
      QRCode.toDataURL(stringData, function (err, code) {
        if (err) return console.log("error occurred");
        res.send(code);
      });
    }
    else{
      res.status(400).json({'result':'_id data not Found'})
    }
    
  },

  async barcodeGen(req, res) {
    // Get barcode data from the query parameters
    
    const assetInfo= await addAssetSchema.find({_id:req.params.id});
    if(assetInfo){
      const barcodeData = req.query.data;
      
      const canvas = createCanvas(400, 300);
      JsBarcode(canvas, barcodeData, {
        format: 'CODE128', 
        displayValue: true,
      });
      
      // Send the barcode image as a response
      res.type('image/png');
      res.setHeader('Content-Length', canvas.toBuffer().length);
      canvas.createPNGStream().pipe(res);
      res.send(canvas);
      
    }
    else{
      return res.status(200).json({"result":"Data not found"});
    }
    
  },
}
module.exports = controller;