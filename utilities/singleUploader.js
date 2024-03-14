//External imports
const createError = require("http-errors");
const multer = require("multer");
const path = require("path");

function uploader(
    subfolder_path,
    allowed_file_types,
    max_file_size,
    error_msg
){
    // File upload folder
  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;
  
  // define the storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const filename = 
              file.originalname
              .replace(fileExt, "")
              .toLowerCase()
              .split(" ")
              .join("-") + "-" +  Date.now()
          
        cb(null, filename + fileExt)
    }
  })

  // preapre the finel multer upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size
    },
    fileFilter: (req, file, cb) => {
      //alllowed file types exist a elements of array.then check upload file using includes in the array.
      if(allowed_file_types.includes(file.mimetype)){
        cb(null, true)
      }
      else{
        cb(createError(error_msg));
      }
    }
  })
  
  
  return upload
}

module.exports = uploader;