const express = require('express');
const mainRoutes=require('./routes/routes-main');
const mainCourses=require('./routes/routesCourses');
const mainUnits=require('./routes/routesUnits');
const mainUsers=require('./routes/routesUsers');
var methodOverride = require('method-override')

var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const app = express();
require("./database/database");
require("./config/passport.js");

//use
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use(session({
  secret:'jorgegiraldo',
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: false }
}));

app.use(bodyParser.urlencoded({extended:false}));
//app.use(cookieParser());

app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

///set
app.use((req,res,next)=>{
  res.locals.success_msg=req.flash('success_msg');
  res.locals.ok_registro=req.flash('ok_registro');
  res.locals.error_msg=req.flash('error_msg');
  res.locals.error_registro=req.flash('error_registro');
  res.locals.error=req.flash('error');
  res.locals.informacion=req.flash('informacion');
  res.locals.user=req.user || null;
  next();
});
app.set('views',__dirname+'/views')
app.set('public',__dirname+'/public')
app.set('view engine','ejs');
app.use('/main',mainRoutes);
app.use('/courses',mainCourses);
app.use('/users',mainUsers);
app.use('/units',mainUnits);
//
app.set('trust proxy', 1) // trust first proxy
///////////////

var port =process.env.PORT || 8080;

const server = app.listen(port,()=>{
    console.log("server Mongo -- :) -- ");
});
