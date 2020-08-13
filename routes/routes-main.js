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
//////////////////////////////
router.get('/about',(req,res)=> {
  const rta='Acerca de';
  res.render('about',{rta});
  //res.write('hola parcero');
  //res.end();
});


//////////////////////////////
router.get('/logout',(req,res)=> {
  req.session=null;
  req.logout();
  res.redirect('/courses/cursos');
  //res.render('index',{rta:'No logueado....'});
});

//////////////////////////////
router.get('/inicio',(req,res)=> {
  const elUsuario=req.user;
  console.log(elUsuario);
  res.render('inicio',{elUsuario});
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
  passport.authenticate('google', { failureRedirect: '/main/login' }),
  function(req, res) {

    res.redirect('/main/inicio');
  });

//////////////
router.get('/good',(req,res)=> {
  const email=req.user.email;
  res.send('Wellcome '+email);
});
//////////////////////////////
router.get('/registro',async (req,res)=> {
  res.render('registro');
  });

/*router.get('/google/redirect',(req,res)=>{
  res.send('callbackURL');
  //res.render('home.ejs');
});*/
/////////


router.get('session',(req,res)=> {
  // Cookies that have not been signed
console.log('Cookies: ', req.cookies)

// Cookies that have been signed
console.log('Signed Cookies: ', req.signedCookies)
  res.send('estamos melos 1');
});


module.exports=router;
