//external imports
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const createError = require('http-errors');

// Internal imports
const User = require('../models/People')


// get login page
function getLogin(req, res, next){
    res.render("index")
}


//do login
async function login(req, res, next){
    try{
        const user = await User.findOne({
            $or: [ {email: req.body.username}, {mobile: req.body.username}]
        })

        if(user && user._id) {
          const isValidPassword = await bcrypt.compare(
            req.body.password, user.password
          )

          if(isValidPassword){
            //prepare the user object to generate token
            const userObject = {
                username: user.name,
                mobile: user.mobile,
                email: user.email,
                role: "user",
            }

            //generate token
            const token = jwt.sign(userObject, process.env.JWT_TOKEN, {
                expiresIn: process.env.JWT_EXPIRY,
            })

            // set cookie - 1st perameter is setname, 2nd perameter is body, 3rd perameter is options
            res.cookie('chat_app', token, {
                maxAge: process.env.JWT_EXPIRY,
                httpOnly: true,
                signed: true
            })

            // set logged in users local identifier
            res.locals.loggedInUser = userObject;

            res.render("inbox")
          } else{
            throw createError("Login failed! Please try again.")
          }
        } else{
            throw createError("Login failed! Please try again.")
        }
    }
    catch(err){
        res.render("index", {
            data: {
                username: req.body.username
            },
            errors: {
                common: {
                    msg: err.message,
                }
            }
        })
    }
}

//do logout
function logout(req, res) {
    res.clearCookie('chat_app');
    res.send("Successfully logged out")
}

module.exports = {
    getLogin,
    login,
    logout
}