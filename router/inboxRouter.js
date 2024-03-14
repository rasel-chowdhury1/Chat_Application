// external imports
const express = require('express');
const router = express.Router();

//internal import
const {getInbox} = require('../controller/inboxController')
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const {checkLogin} = require('../middlewares/common/checkLogin');

// inbox page
router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox)

module.exports = router;