const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies: null;

    if(cookies){
        try{
            token = cookies['chat_app'];
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);
            req.user = decoded;

            console.log('decoded -> ',decoded)

            // pass user info to response locals
            if(res.locals.html){
                res.locals.loggedInUser = decoded;
            }
            next()
        } catch(err){
            if(res.locals.html){
                req.redirect('/')
            } else{
                res.status(500).json({
                    errors: {
                        common: {
                            msg: "Authentication failure!"
                        }
                    }
                })
            }
        }
    }
    else{
        if(res.locals.html){
            res.redirect('/');
        } else{
            res.status(401).json({
                error: "Authentication failure!"
            })
        }
    }
}

const redirectLoggedIn = function (req, res, next){
    let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies: null;

    if(!cookies){
        next()
    }
    else{
        res.redirect('/inbox')
    }
}


module.exports = {
    checkLogin,
    redirectLoggedIn
};