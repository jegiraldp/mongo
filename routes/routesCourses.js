const router = require('express').Router();
const express = require('express');
const usuarios=require('../models/usuarios');
const cursos=require('../models/cursos');
const unidades=require('../models/unidades');
const passport=require('passport');
const {isAuthenticated} = require('../helpers/auth');

//////////////////////////////
////cursos
//////////////////////////////
router.get('/menuCursos',(req,res)=> {
  res.render('menuCursos');
});
//////////////////////////////
router.get('/cursos',async (req,res)=> {
  const rta=await cursos.find().sort({nombre:1});
  res.render('cursos',{rta:rta});
});

////////////////////////
router.get('/todosCursos',async (req,res)=> {
  const rta=await cursos.find();
    const elUsuario=req.user;
  res.render('todosCursos',{rta:rta,elUsuario,cantidad:rta.length});
});
//////////////////////////////
router.get('/cursosMain',isAuthenticated,async (req,res)=> {
    const elUsuario=req.user;
  res.render('cursosMain',{elUsuario});
});
//////////////////////////////
//////////////////////////////
router.get('/misCursos',async (req,res)=> {
  const elUsuario=req.user;
  const correo= elUsuario._json.email;
  const username= correo.substring(0,correo.indexOf('@'));
  const rta=await cursos.find({user:username});
  res.render('misCursos',{rta,elUsuario,cantidad:rta.length});
});

///////////////////////////
router.get('/inicioCurso/:_id',isAuthenticated,async (req,res)=> {
  const elUsuario=req.user;
  const contador=0;
  const rta=await cursos.findById(req.params._id);
  const lasUnidades=await unidades.find({idCurso:rta._id}).sort({orden:1});
  for (var i = 0; i < lasUnidades.length; i++) {
    orden=(i+1);
    await unidades.findByIdAndUpdate(lasUnidades[i]._id,{orden});
    lasUnidades[i].orden=(i+1);
  }
  //console.log(rta);
  res.render('cursoInicio',{rta,lasUnidades,cantidad:lasUnidades.length,elUsuario});
});
///////////////////////////
router.get('/cursoInicioPublic/:_id',isAuthenticated,async (req,res)=> {
  const contador=0;
  const rta=await cursos.findById(req.params._id);
  const lasUnidades=await unidades.find({idCurso:rta._id}).sort({orden:1});
  for (var i = 0; i < lasUnidades.length; i++) {
    orden=(i+1);
    await unidades.findByIdAndUpdate(lasUnidades[i]._id,{orden});
    lasUnidades[i].orden=(i+1);
  }
    res.render('cursoInicioPublic',{rta,lasUnidades,cantidad:lasUnidades.length});
});
//////////////////////////////
router.get('/nuevoCurso',isAuthenticated,(req,res)=> {
  const elUsuario=req.user;
  //console.log(elUsuario);
  res.render('nuevoCurso',{rta:null,elUsuario});
});

//////////////////////////////
router.post('/nuevoCurso',isAuthenticated,async (req,res)=> {
const elUsuario=req.user;
const correo=elUsuario._json.email;
const username= correo.substring(0,correo.indexOf('@'));
const creador=await usuarios.findOne({username:username});
const {nombre,descripcion}=req.body;
if(nombre.length==0 || descripcion.length==0){
  req.flash('error_registro',"Faltan datos del curso");
    res.redirect('/courses/nuevoCurso');
}else {
  const elCurso=await cursos.findOne({nombre:nombre,user:username});
  if(elCurso){
    req.flash('error_registro',"Nombre de curso ya existe");
    res.redirect('/courses/nuevoCurso');
  }else{
    //fecha
    var dat = new Date();
    var mes =(parseInt(dat.getMonth()))+1;
    let fecha = dat.getDate()+"-"+mes+"-"+dat.getFullYear();

  const nuevoCurso=new cursos({nombre,fecha,descripcion,user:username,creador:creador.nombre});
  await nuevoCurso.save();
  req.flash('ok_registro',"Curso registrado correctamente");
  res.redirect('/courses/misCursos');

}//else

}//else main



});

//////////////////////////////
router.get('/editarCurso/:_id',isAuthenticated,async(req,res)=> {
  const rta=await cursos.findById(req.params._id);
  res.render('editarCurso', {rta:rta,informacion:rta.nombre});
});
//////////////////////////////
router.put('/editarCurso/:_id',isAuthenticated,async(req,res)=> {
  const {nombre,descripcion}= req.body;
  await cursos.findByIdAndUpdate(req.params._id,{nombre, descripcion});
  req.flash('ok_editarCurso',nombre);
  res.redirect('/courses/misCursos');

});

//////////////////////////////
router.delete('/deleteCurso/:_id',isAuthenticated,async(req,res)=> {
const rta=await cursos.findById(req.params._id);
await cursos.findByIdAndDelete(req.params._id);
req.flash('ok_registro',"Curso "+rta.nombre+" eliminado correctamente");
res.redirect('/courses/misCursos');

});

//////////////////////////////

/////////
module.exports=router;
