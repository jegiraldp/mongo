const router = require('express').Router();
const express = require('express');
const usuarios=require('../models/usuarios');
const cursos=require('../models/cursos');
const passport=require('passport');
const {isAuthenticated} = require('../helpers/auth');

//////////////////////////////
//usuarios//////////////////////////////
router.get('/nuevaUnidad/:_id',isAuthenticated,async (req,res)=> {
  const rta=await cursos.findById(req.params._id);
  res.render('nuevaUnidad',{rta});
});
//////////////////////////////
/*
router.post('/nuevaUnidad',isAuthenticated,async (req,res)=> {

const {nombre,descripcion}=req.body;
if(nombre.length==0 || descripcion.length==0){
  req.flash('error_registro',"Faltan datos del curso");
    res.redirect('/courses/nuevoCurso');
}else {
  const elCurso=await cursos.findOne({nombre:nombre});
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
*/
/////////
module.exports=router;
