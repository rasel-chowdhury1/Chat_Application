// external imports
const express = require('express');
const router = express.Router();

//internal import
const {getLogin, login, logout} = require('../controller/loginController')
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse')
const {doLoginValidators, doLoginValidationHandler} = require('../middlewares/login/loginValidator');
const { redirectLoggedIn } = require('../middlewares/common/checkLogin');


//set page_title name 
const page_title = "Login"

// login page
router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn,getLogin)

// process login
router.post('/', 
    decorateHtmlResponse(page_title),
    doLoginValidators, 
    doLoginValidationHandler, 
    login
)

//logout
router.delete("/", logout);

module.exports = router;
