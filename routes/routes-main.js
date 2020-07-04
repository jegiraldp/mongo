const router = require('express').Router();
const express = require('express');
const usuarios=require('../models/usuarios');
const cursos=require('../models/cursos');
const passport=require('passport');
const {isAuthenticated} = require('../helpers/auth');

router.get('/',(req,res)=> {
  const rta=99;
  res.render('index.ejs',{rta:''});
  //res.write('hola parcero');
  //res.end();
});

router.get('/menuCursos',(req,res)=> {
  res.render('menuCursos');
  //res.write('hola parcero');
  //res.end();
});



router.get('/logout',(req,res)=> {
  req.logout();
  res.redirect('/main');
  //res.render('index',{rta:'No logueado....'});
});

router.get('/inicio',(req,res)=> {
  res.render('inicio');
});





//usuarios
router.get('/usuariosMain',async (req,res)=> {
  res.render('usuariosMain',{});
});

router.get('/usuarios',async (req,res)=> {
  const rta=await usuarios.find();
  res.render('usuarios',{rta});
});

router.get('/nuevoUsuario',isAuthenticated,(req,res)=> {
  //const nn =req.session.mivariable;
  //delete req.session.mivariable;
  res.render('nuevoUsuario',{rta:null});
});

router.post('/nuevoUsuario',isAuthenticated,async (req,res)=> {
  const {usuario,clave}=req.body;
  console.log('buscar '+usuario);
  const el_usuario=await usuarios.findOne({usuario:usuario});
  if(el_usuario){
    req.flash('error_registro',"Nombre de usuario ya existe");
    res.redirect('/main/nuevoUsuario');
  }else{
  const nuevoUsuario=new usuarios({usuario,clave});
  nuevoUsuario.clave=await nuevoUsuario.encryptPassword(clave);
  await nuevoUsuario.save();
  req.flash('ok_registro',"Usuario registrado correctamente");
  res.redirect('/main/nuevoUsuario');
  //res.render('nuevoUsuario',{rtae:"Usuario registrado correctamente"});
}//else
});

////cursos

router.get('/cursos',async (req,res)=> {
  const rta=await cursos.find();
  res.render('cursos',{rta});
});

router.get('/cursosMain',async (req,res)=> {
  res.render('cursosMain',{});
});
router.get('/nuevoCurso',isAuthenticated,(req,res)=> {
  res.render('nuevoCurso',{rta:null});
});

router.post('/nuevoCurso',isAuthenticated,async (req,res)=> {

  const {nombre,descripcion}=req.body;
  const elCurso=await cursos.findOne({nombre:nombre});
  if(elCurso){
    req.flash('error_registro',"Nombre de curso ya existe");
    res.redirect('/main/nuevoCurso');
  }else{
    //fecha
    var dat = new Date();
    var mes =(parseInt(dat.getMonth()))+1;
    let fecha = dat.getDate()+"-"+mes+"-"+dat.getFullYear();
    ///
  const nuevoCurso=new cursos({nombre,fecha,descripcion});
  nuevoCurso.user=req.user.id;
  await nuevoCurso.save();
  req.flash('ok_registro',"Curso registrado correctamente");
  res.redirect('/main/nuevoCurso');

}//else
});
///////////////


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
