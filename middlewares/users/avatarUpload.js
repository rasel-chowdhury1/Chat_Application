// const uploader = require('../../utilities/singleUploader')

// function avatarUpload(req, res, next){
//     //first paramer is -> folder name, second parameter is -> allow which type of file, third parameter is -> file size, four parameter is -> error message
//    const upload = uploader(
//     "avatar",
//     ["image/jpeg", "image/jpg", "image/png"],
//     1000000,
//     "Only .jpg, jpeg or .png format allowed!"
//    )

//    // call the middleware function
//    upload.any()(req, res, (err) => {
//     if(err){
//         res.status(500).json({
//             errors: {
//                 avatar: {
//                     msg: err.message
//                 }
//             }
//         })
//         console.log("face error in avatarUpload file",err)
//     }
//     else{
//         console.log('working properly done in avatarUpload file')
//         next()
//     }
//    })
// }

// module.exports = avatarUpload

const uploader = require("../../utilities/singleUploader");

function avatarUpload(req, res, next) {
  console.log("req data -> ",req.body)
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Only .jpg, jpeg or .png format allowed!"
  );
  
  console.log('pass line 44 in avatarUpload.js')
  // call the middleware function
  upload.any()(req, res, (err) => {
    console.log('req data line 47 -> ', req.body)
    console.log('err data line -> ', err)
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });

    } else {
      next();
    }
  });
}

module.exports = avatarUpload;