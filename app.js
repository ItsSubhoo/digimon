var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var expressSession=require("express-session")
var logger = require('morgan');
var passport = require('passport');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const flash =require("connect-flash");

var app = express();
app.set('view engine', 'ejs');
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:"Subhajit Lainan"
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());
app.get("/logout",function(req,res,next){
    req.logOut(function(err){
  
      if (err) return next(err);
      res.redirect('/');
    });
  
  })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
