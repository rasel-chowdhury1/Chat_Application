const createError = require('http-errors');

// 404 not found handler
function notFoundHandler(req, res, next){
    next(createError(404, "Your requested content was not found!"))
}

//default error handler
function errorHandler(err, req, res, next){
    res.locals.error = 
    process.env.NODE_ENV === "development" ? err: {message: err.message};

    res.status(err.status || 500);

    if(res.locals.html){
        //html response
        res.render("error", {
            title: "Error page"
        })
    } else{
        //json response
        res.json(res.locals.error)
    }

    // res.render('error', {
    //     title: 'Error page'
    // })

    //another way to pass title
    // res.locals.title = "Error page"
    // res.render('error')
}

module.exports = {
    notFoundHandler,
    errorHandler
}