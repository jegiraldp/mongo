const router = require('express').Router();
const express = require('express');
const usuarios=require('../models/usuarios.js');

router.get('/',(req,res)=> {
  const rta=99;
  res.render('index.ejs');
  //res.write('hola parcero');
  //res.end();
});

router.get('/login',(req,res)=> {
  res.render('login');
});

router.get('/nuevook',async (req,res)=> {
  const losUsuarios=await usuarios.find();
  res.render('nuevook',{losUsuarios:losUsuarios});
});


router.post('/loginpost',async (req,res)=> {
  console.log('hola login post');
  const {usuario,clave}=req.body;
  const nuevoUsuario=new usuarios({usuario,clave});
  await nuevoUsuario.save();
  console.log(nuevoUsuario);
  res.redirect('/main/nuevook');
});


router.get('nuevo',(req,res)=> {
  res.render('nuevo');
});

router.get('session',(req,res)=> {
  // Cookies that have not been signed
console.log('Cookies: ', req.cookies)

// Cookies that have been signed
console.log('Signed Cookies: ', req.signedCookies)
  res.send('estamos melos 1');
});


module.exports=router;
