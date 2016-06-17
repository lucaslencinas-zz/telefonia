var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var managers = require('./routes/managers');
var telefoniaLocal = require('./routes/telefoniaLocal');
var telefoniaAdmin = require('./routes/telefoniaAdmin');
var servicios = require('./routes/servicios')
var ibmLogin = require('./routes/ibmLogin')
var data = require('./routes/data')
var logs = require('./routes/logs')
var adminsLevel = require('./routes/adminsLevel')
var index = require('./routes/index')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/managers', managers);
app.use('/telefoniaLocal', telefoniaLocal);
app.use('/telefoniaAdmin', telefoniaAdmin);
app.use('/servicios', servicios)
app.use('/ibmLogin', ibmLogin)
app.use('/data', data)
app.use('/logs', logs)
app.use('/adminsLevel', adminsLevel)
app.use('/', index)

app.use(express.static(path.join(__dirname, 'public')));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
