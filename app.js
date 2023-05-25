const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport')

// Para cookies(para recibir)
const express_session = require('express-session')

// const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const app = express();

// Requerimos para haer la conexion, despues de crear la app
const pool = require("./config/conexion")

// Almacenar cookies en la bd(para guardar)
const session_mysql = require('express-mysql-session')(express_session)

// Traemos passport creado para tratar las cookies
require('./config/passport')

// Configuracion para almacenar sesiones en la bd
app.use(express_session({
  key:"session",
  secret: "secret",
  store: new session_mysql({},pool),
  resave: false,
  saveUninitialized:false
}))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware(configuraciones del servidor)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Activamos passport y usamos sesiones a traves de el
app.use(passport.initialize())

// Activamos sesiones en passport
app.use(passport.session())

// Variable global sacada de passport, para pintar en las vistas(name, email, etc.)
app.use( (req,res,next) =>{
  app.locals.user = req.user
  next()
})

app.use('/', userRouter);

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
