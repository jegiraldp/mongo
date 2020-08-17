const router = require('express').Router();
const express = require('express');
const usuarios=require('../models/usuarios');
const cursos=require('../models/cursos');
const passport=require('passport');
const {isAuthenticated} = require('../helpers/auth');


//////////////////////////////
router.get('/',async (req,res)=> {
  const rta=await cursos.find().sort({nombre:1});
  res.render('cursos',{rta});
  });

  ///////////
  router.get('/home',async (req,res)=> {
    res.render('index');
    });
//////////////////////////////
router.get('/about',(req,res)=> {
  const rta='Acerca de';
  res.render('about',{rta});

});


//////////////////////////////
router.get('/logout',(req,res)=> {
  //req.session=null;
  req.logout();
  res.redirect('https://mail.google.com/mail/u/0/?logout&hl=en');
  //res.redirect('/courses/cursos');

});

//////////////////////////////
router.get('/inicio',isAuthenticated,async (req,res)=> {
  const elUsuario=req.user;
  if(elUsuario){
  const correo =elUsuario._json.email;
  //console.log(elUsuario);
  const existe=await usuarios.findOne({correo:correo});
  if(existe){
    res.render('inicio',{elUsuario:elUsuario,estado:"1"});

  }else{
    res.render('inicio',{elUsuario:elUsuario,estado:"2"});

  }
}else{
  res.render('inicio',{elUsuario:null,estado:"0"});
}

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

/////////////////////////////
//google
router.get('/google',passport.authenticate('google', {
   scope: ["profile", "email"]
}));
//////////////
router.get('/google/callback',
passport.authenticate('google', { failureRedirect: '/main' }),
  function(req, res) {
    res.redirect('/main/inicio');
  });

//////////////
router.get('/good',(req,res)=> {
  const email=req.user.email;
  res.send('Wellcome '+email);
});


module.exports=router;
