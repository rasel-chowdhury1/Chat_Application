// external imports
const express = require('express');
const router = express.Router();

//internal import
const {getInbox} = require('../controller/inboxController')

// login page
router.get("/", getInbox)

module.exports = router;