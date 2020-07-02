const router = require('express').Router();
const express = require('express');
const usuarios=require('../models/usuarios');
const passport=require('passport');
const {isAuthenticated} = require('../helpers/auth');

router.get('/',(req,res)=> {
  const rta=99;
  res.render('index.ejs',{rta:''});
  //res.write('hola parcero');
  //res.end();
});

router.get('/nuevo',isAuthenticated,(req,res)=> {
  //const nn =req.session.mivariable;
  //delete req.session.mivariable;
  res.render('nuevo',{rta:null});
});

router.get('/logout',(req,res)=> {
  req.logout();
  res.redirect('/main');
  //res.render('index',{rta:'No logueado....'});
});

router.get('/inicio',(req,res)=> {
  res.render('inicio');
});

router.get('/nuevook',async (req,res)=> {
  const rta=await usuarios.find();
  res.render('nuevook',{rta});
});


router.post('/nuevo',isAuthenticated,async (req,res)=> {
  const {usuario,clave}=req.body;
  console.log('buscar '+usuario);
  const el_usuario=await usuarios.findOne({usuario:usuario});
  if(el_usuario){
    //req.flash('error_msg',"Usuario Ya existe");
    res.render('nuevo',{rta:"Usuario Ya existe"});
    //req.flash('error_msg',"Usuario ya existe");
  }else{
  const nuevoUsuario=new usuarios({usuario,clave});
  nuevoUsuario.clave=await nuevoUsuario.encryptPassword(clave);
  await nuevoUsuario.save();
  //req.flash('success_msg',"Usuario registrado correctamente");
  //res.redirect('/main/login');
  res.render('nuevo',{rta:"Usuario registrado correctamente"});
}//else
});

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
