const router = require('express').Router();
const express = require('express');
const usuarios=require('../models/usuarios');
const cursos=require('../models/cursos');
const unidades=require('../models/unidades');
const passport=require('passport');
const {isAuthenticated} = require('../helpers/auth');

//////////////////////////////
//////////////////////////////
router.get('/inicioUnidad/:_id/:idCurso',isAuthenticated,async (req,res)=> {
  const rtaUnidad=await unidades.findById(req.params._id);
  const rtaCurso=await cursos.findById(req.params.idCurso);
  //const lasUnidades=await unidades.find({idCurso:rta._id}).sort({orden:1});
  //console.log(lasUnidades);
  res.render('unidadInicio',{rtaUnidad,rtaCurso});
});
//////////////////////////////
////////////////////////////////
router.get('/nuevaUnidad/:_id/:estado',isAuthenticated,async (req,res)=> {
  const elCurso=await cursos.findById(req.params._id);
  const estado=req.params.estado;
  if(estado=="2"){
    res.render('nuevaUnidad',{elCurso, error_registro_unidad:"Faltan datos de la unidad"});
  }else{
    if(estado=="3"){
  res.render('nuevaUnidad',{elCurso, error_registro_unidad:"Nombre de unidad ya existe"});
    }else{
  res.render('nuevaUnidad',{elCurso, error_registro_unidad:""});
  }
}
});
//////////////////////////////

router.post('/nuevaUnidad',isAuthenticated,async (req,res)=> {
const {_id,nombre,descripcion}=req.body;
if(nombre.length==0 || descripcion.length==0){
res.redirect('/units/nuevaUnidad/'+_id+'/2');
}else{
  const existeNombre=await unidades.findOne({nombre:nombre,idCurso:_id});
  if(existeNombre){
    res.redirect('/units/nuevaUnidad/'+_id+'/3');
  }else{
  const cant=await unidades.find({idCurso:_id}).countDocuments();
  const orden= (cant+1);
  const nuevaUnidad=new unidades({idCurso:_id,nombre,descripcion,orden});
  await nuevaUnidad.save();
  req.flash('ok_registro',nuevaUnidad.nombre);
  res.redirect('/units/nuevaUnidad/'+_id+'/1');
}//else existeNombre
}//else vacio

});

//////////////////////////////
router.get('/editarUnidad/:_id',isAuthenticated,async(req,res)=> {
  const rta=await unidades.findById(req.params._id);
  res.render('editarUnidad', {rta:rta,informacion:rta.nombre});
});
//////////////////////////////
router.put('/editarUnidad/:_id',isAuthenticated,async(req,res)=> {
  const {nombre,descripcion}= req.body;
  const rtaU=await unidades.findById(req.params._id);
  await unidades.findByIdAndUpdate(req.params._id,{nombre, descripcion});
  req.flash('ok_editarUnidad',nombre);
  res.redirect('/courses/inicioCurso/'+rtaU.idCurso);

});

//////////////////////////////
router.delete('/deleteUnidad/:_id',isAuthenticated,async(req,res)=> {
const rta=await unidades.findById(req.params._id);
await unidades.findByIdAndDelete(req.params._id);
req.flash('ok_registro',"Unidad "+rta.nombre+" eliminada correctamente");
  res.redirect('/courses/inicioCurso/'+rta.idCurso);

});

//////////////////////////////

//////////////////////////////
module.exports=router;
