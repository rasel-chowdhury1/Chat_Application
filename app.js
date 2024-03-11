// external imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
port = 3000


// internal imports
const {notFoundHandler, errorHandler} = require('./middlewares/common/errorHandler');
const loginRouter = require('./router/loginRouter');
const usersRouter = require('./router/usersRouter');
const inboxRouter = require('./router/inboxRouter');


const app = express()
dotenv.config()


//database collections
mongoose.connect(process.env.MONGO_CONNECTION_STING)
.then(() => {
    console.log('database successfully connected')
})
.catch(err => console.log(err))

//request parsers
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//set view engine
app.set('view engine', 'ejs')

//set static folder
app.use(express.static(path.join(__dirname, "public")))

//parser cookie
app.use(cookieParser(process.env.COOKIE_SECRET))

//routing setup
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);

//404 not found handler
app.use(notFoundHandler);

//error handler
app.use(errorHandler)


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})