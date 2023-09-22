const multer = require('multer');
const uploadImg=require('./image.model');;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './tmp');
    },
    filename: function (req, file, cb) {
      let uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const f=file.originalname.split(".")[1];
        if(f=='jpeg'|| f=="png"||f=="img"||f=="jpg"){
          uniqueSuffix=uniqueSuffix+".jpg";
        }
        else{
          uniqueSuffix=uniqueSuffix+`.${f}`
        }
      cb(null, file.originalname + '-' + uniqueSuffix)
    }
  })
  const upload = multer({ storage: storage }).array('images', 10); 
  
   function handleFileUpload(req, res) {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send('File upload failed.');
      }
  
      // Store the file information in a separate schema or perform any other required processing
      const imageSchema = new uploadImg({
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      });
      await imageSchema.save();
      next();
    }); 
  }
  
  module.exports={handleFileUpload};