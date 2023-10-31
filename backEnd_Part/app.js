var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose")
var cors = require('cors')

var indexRouter = require('./src/routes/routes');



require('dotenv').config()

// getting name means every thing is good
// console.log(process.env.name)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())


// // // Mongo DB connection code 
mongoose.connect("mongodb+srv://ashishkuldeep23:RAPXp7lktCcf8jBm@cluster0.xtascce.mongodb.net/e_commerce", { useNewUrlParser: true })
.then(() => console.log("Mongoose connected successfully"))
.catch((err) => { console.log("An error occured :- " + err) })



app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
