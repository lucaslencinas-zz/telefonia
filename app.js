var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

//----------------------------


var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 5,
  host     : 'us-cdbr-iron-east-03.cleardb.net',
  user     : 'b907d8d6e3ab57',
  password : '06e49fb8',
  database : 'heroku_74c23f2458ff8ba'
});

pool.getConnection(function(err, connection) {
  // Use the connection
  connection.query( 'SELECT 1 + 1 AS solution', function(err, rows) {
    // Always release the connection back to the pool after the (last) query.
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);  
    connection.release();

    // Don't use the connection here, it has been returned to the pool.
  });
});
/*
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'us-cdbr-iron-east-03.cleardb.net',
  user     : 'b907d8d6e3ab57',
  password : '06e49fb8',
  database : 'heroku_74c23f2458ff8ba'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});

connection.end();


*/

//--------------------------

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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
