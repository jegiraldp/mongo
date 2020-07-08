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
router.get('/menuCursos',(req,res)=> {
  res.render('menuCursos');
  //res.write('hola parcero');
  //res.end();
});


//////////////////////////////
router.get('/logout',(req,res)=> {
  req.logout();
  res.redirect('/main/cursos');
  //res.render('index',{rta:'No logueado....'});
});

//////////////////////////////
router.get('/inicio',(req,res)=> {
  res.render('inicio');
});

//usuarios//////////////////////////////
router.get('/usuariosMain',async (req,res)=> {
  res.render('usuariosMain',{});
});
//////////////////////////////
router.get('/usuarios',isAuthenticated,async (req,res)=> {
  const rta=await usuarios.find();
  res.render('usuarios',{rta});
});
//////////////////////////////
router.get('/nuevoUsuario',isAuthenticated,(req,res)=> {
  //const nn =req.session.mivariable;
  //delete req.session.mivariable;
  res.render('nuevoUsuario',{rta:null});
});
//////////////////////////////
router.post('/nuevoUsuario',isAuthenticated,async (req,res)=> {
  const {usuario,clave,nombre}=req.body;
  if(usuario.length==0 || nombre.length==0 || clave.length==0){
    req.flash('error_registro',"Faltan datos del usuario");
      res.redirect('/main/nuevoUsuario');
  }else {
  const el_usuario=await usuarios.findOne({usuario:usuario});
  if(el_usuario){
    req.flash('error_registro',"Nombre de usuario ya existe");
    res.redirect('/main/nuevoUsuario');
  }else{
  const nuevoUsuario=new usuarios({usuario,clave,nombre});
  nuevoUsuario.clave=await nuevoUsuario.encryptPassword(clave);
  await nuevoUsuario.save();
  req.flash('ok_registro',"Usuario registrado correctamente");
  res.redirect('/main/nuevoUsuario');
  //res.render('nuevoUsuario',{rtae:"Usuario registrado correctamente"});
}//else
}//else main
});

////cursos
//////////////////////////////
router.get('/cursos',async (req,res)=> {
  const rta=await cursos.find();
  res.render('cursos',{rta:rta});
});
//////////////////////////////
router.get('/misCursos',async (req,res)=> {
  const rta=await cursos.find({user:req.user.id});
  res.render('cursos',{rta});
});
//////////////////////////////
router.get('/cursosMain',isAuthenticated,async (req,res)=> {
  res.render('cursosMain',{});
});
//////////////////////////////
router.get('/nuevoCurso',isAuthenticated,(req,res)=> {
  res.render('nuevoCurso',{rta:null});
});

//////////////////////////////
router.post('/nuevoCurso',isAuthenticated,async (req,res)=> {

const {nombre,descripcion}=req.body;
if(nombre.length==0 || descripcion.length==0){
  req.flash('error_registro',"Faltan datos del curso");
    res.redirect('/main/nuevoCurso');
}else {
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

  const creador=await usuarios.findById(req.user.id);
  const nombreCreador=creador.nombre;
  const nuevoCurso=new cursos({nombre,fecha,descripcion});

  nuevoCurso.creador=nombreCreador;
  nuevoCurso.user=req.user.id;
  //console.log(nuevoCurso);
  await nuevoCurso.save();
  req.flash('ok_registro',"Curso registrado correctamente");
  res.redirect('/main/nuevoCurso');

}//else

}//else main



});

//////////////////////////////
router.get('/editarCurso/:_id',isAuthenticated,async(req,res)=> {
  const rta=await cursos.findById(req.params._id);
  res.render('editarCurso',
  {
    rta:rta,
    informacion:'>> Editando curso '+rta.nombre});

});
//////////////////////////////
router.put('/editarCurso/:_id',isAuthenticated,async(req,res)=> {
  const {nombre,descripcion}= req.body;
  await cursos.findByIdAndUpdate(req.params._id,{nombre, descripcion});
  req.flash('ok_registro',"Curso "+nombre+" editado correctamente");
  res.redirect('/main/misCursos');

});

//////////////////////////////
router.get('/deleteCurso/:_id',isAuthenticated,async(req,res)=> {
const cursoDelete= await cursos.findById(req.params._id);
console.log('Eliminar '+cursoDelete.nombre);

});

//////////////////////////////


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
