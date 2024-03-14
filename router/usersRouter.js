// external imports
const express = require('express');


const router = express.Router();

//internal import
const {getUsers, addUser, removeUser} = require('../controller/usersController')
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse")
const avatarUpload = require('../middlewares/users/avatarUpload')
const {addUserValidators, addValidationHandler} = require('../middlewares/users/userValidator');
const {checkLogin} = require('../middlewares/common/checkLogin');


// user page
router.get("/", decorateHtmlResponse("user"), checkLogin,getUsers)

//add user
router.post("/",
    checkLogin,
    avatarUpload, 
    addUserValidators, 
    addValidationHandler, 
    addUser
 );

 // remove user
 router.delete("/:id", removeUser)


module.exports = router;