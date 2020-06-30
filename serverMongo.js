const express = require('express');
const mainRoutes=require('./routes/routes-main');
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
require("./database");

//use
app.use(session({
  secret:'jorgegiraldo',
  resave: false,
 saveUninitialized: true,
 //cookie: { secure: true }
}));
app.use(bodyParser.urlencoded({extended:false}));
//app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(express.json());

///set
app.set('views',__dirname+'/views')
app.set('public',__dirname+'/public')
app.set('view engine','ejs');
app.use('/main',mainRoutes);
//
app.set('trust proxy', 1) // trust first proxy
///////////////

var port =process.env.PORT || 8080;

const server = app.listen(port,()=>{
    console.log("server Mongo -- :) -- ");
});
