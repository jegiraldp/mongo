const router = require('express').Router();
const express = require('express');
const usuarios=require('../models/usuarios');
const cursos=require('../models/cursos');
const passport=require('passport');
const {isAuthenticated} = require('../helpers/auth');

//////////////////////////////
//usuarios//////////////////////////////
router.get('/nuevaUnidad/:_id',isAuthenticated,async (req,res)=> {
  const elCurso=await cursos.findById(req.params._id);
  res.render('nuevaUnidad',{elCurso});
});
//////////////////////////////

router.put('/nuevaUnidad/:_id',isAuthenticated,async (req,res)=> {
const {nombre,descripcion}=req.body;
console.log(req.params._id);
if(nombre.length==0 || descripcion.length==0){
  req.flash('error_registro',"Faltan datos de la unidad");
    res.redirect('/units/nuevaUnidad/5f0e6cff6f92eb0d241aa619');
    console.log("Faltan datos");
}/*else {
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
*/

});

/////////
module.exports=router;
