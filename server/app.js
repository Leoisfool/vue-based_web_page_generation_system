var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs')
var createError = require('http-errors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var appsRouter = require('./routes/apps');
var adminsRouter = require('./routes/admins')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   if (req.cookies.userId) {
//     // if (req.path === '/users') {
//     // console.log('************************userId************************')
//       next()
//     // }
//   } else if (req.cookies.adminId) {
//     // console.log('************************adminId************************')
//     next()
//   } else {
//     console.log('************************else************************')
//     console.log('req.originalUrl' + req.originalUrl)
//     if (req.originalUrl == '/users/login*' || req.originalUrl == '/users/logout' || req.originalUrl == '/users/register' || req.originalUrl == '/users/checkLogin' || req.originalUrl == '/admins/login' || req.originalUrl == '/admins/checkLogin') {
//       // console.log('************************else if************************')      
//       next()
//     } else {
//       res.json({
//         status: '10001',
//         msg: '当前还木有登录呢！',
//         result: ''
//       })
//     }
//   }
// })

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/apps', appsRouter);
app.use('/admins', adminsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
