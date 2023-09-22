const multer = require('multer');
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
 
  const upload = multer({ storage: storage })
  
  module.exports=upload;