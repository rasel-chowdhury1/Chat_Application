//external imports
const {check, validationResult} = require('express-validator');
const createError = require("http-errors");
const {unlink} = require('fs')
const path = require('path');


//internal imports
const Users = require('../../models/People');


// add user
const addUserValidators = [
    check("name")
     .isLength({min: 1})
     .withMessage("Name is required")
     .isAlpha("en-US", { ignore: " -" })
     .withMessage("Name must not contain anything other than alphabet")
     .trim(),
    check("email")
     .isEmail()
     .withMessage("Invalid email address")
     .trim()
     .custom(async (value) => {
        try {
            const user = await Users.findOne({ email: value});
            if(user){
                throw createError("Email already is use!")
            }
        }
        catch(err){
            throw createError(err.message)
        }
     }),
    check("mobile")
     .isMobilePhone('bn-BD', {
        strictMode: true
     })
     .withMessage("Mobile number must be a valid Bangladeshi mobile number!")
     .custom( async (value) => {
        try{
            const user = await Users.findOne({mobile: value})
            if(user){
                throw createError("Mobile already is use!")
            }
        }
        catch(err){
            throw createError(err.message)
        }
     }),
     check("password")
      .isStrongPassword()
      .withMessage("Password must be atleast 8 characters long & should contain at least 1 lowercase,1 uppercase, 1 number & 1 symbol")
           
];

const addValidationHandler = function (req, res, next){
    console.log("req in userValidator file -> ", req)
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if(Object.keys(mappedErrors).length === 0){
        next()

    }
    else{
        console.log('form validation error in usersRouter')
        // remove uploaded files
        if(req.files.length > 0){
            const {filename} = req.files[0];
            unlink(
                path.join(__dirname, `/../public/uploades/${filename}`),
                (err) => {
                    if(err) console.log(err)
                }
            );
        }
        
        console.log('errors ->', mappedErrors)
        // response the errors
        res.status(500).json({
            errors: mappedErrors
        })
    }

    /**
      mappedErrors = {
        name: {
            msg: "name is required"
        },
        email: {
            msg: "Invalid email address"
        }
      }
     */
}

module.exports = {
    addUserValidators,
    addValidationHandler
}