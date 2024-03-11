// external imports
const express = require('express');
const router = express.Router();

//internal import
const {getUsers} = require('../controller/usersController')
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse")

// user page
router.get("/", decorateHtmlResponse("user"), getUsers)

module.exports = router;