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
  const rta=await cursos.find();
  res.render('cursos',{rta:rta});
});

////////////////////////
router.get('/todosCursos',async (req,res)=> {
  const rta=await cursos.find();
  res.render('todosCursos',{rta:rta});
});
//////////////////////////////
router.get('/cursosMain',isAuthenticated,async (req,res)=> {
  res.render('cursosMain',{});
});
//////////////////////////////
//////////////////////////////
router.get('/misCursos',async (req,res)=> {
  const rta=await cursos.find({user:req.user.id});
  res.render('misCursos',{rta});
});
//////////////////////////////
router.get('/inicioCurso/:_id',isAuthenticated,async (req,res)=> {
  const rta=await cursos.findById(req.params._id);
  const lasUnidades=await unidades.find({idCurso:rta._id}).sort({orden:1});
  //console.log(lasUnidades);
  res.render('cursoInicio',{rta,lasUnidades});
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
    res.redirect('/courses/nuevoCurso');
}else {
  const elCurso=await cursos.findOne({nombre:nombre,user:req.user.id});
  if(elCurso){
    req.flash('error_registro',"Nombre de curso ya existe");
    res.redirect('/courses/nuevoCurso');
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
  res.redirect('/courses/nuevoCurso');

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
