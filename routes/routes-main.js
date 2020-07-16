const router = require('express').Router();
const express = require('express');
const usuarios=require('../models/usuarios');
const cursos=require('../models/cursos');
const passport=require('passport');
const {isAuthenticated} = require('../helpers/auth');


//////////////////////////////
router.get('/',(req,res)=> {
  const rta='- Bienvenido - ';
  res.render('index',{rta});
  //res.write('hola parcero');
  //res.end();
});
//////////////////////////////
router.get('/about',(req,res)=> {
  const rta='Acerca de';
  res.render('about',{rta});
  //res.write('hola parcero');
  //res.end();
});


//////////////////////////////
router.get('/logout',(req,res)=> {
  req.logout();
  res.redirect('/courses/cursos');
  //res.render('index',{rta:'No logueado....'});
});

//////////////////////////////
router.get('/inicio',(req,res)=> {
  res.render('inicio');
});


///////////////////////////
router.get('/login',(req,res)=> {
  res.render('login');
});

router.post('/login',passport.authenticate('local',{
  successRedirect:'/main/inicio',
  failureRedirect:'/main/login',
  failureFlash:true,
}));


router.get('session',(req,res)=> {
  // Cookies that have not been signed
console.log('Cookies: ', req.cookies)

// Cookies that have been signed
console.log('Signed Cookies: ', req.signedCookies)
  res.send('estamos melos 1');
});


module.exports=router;
