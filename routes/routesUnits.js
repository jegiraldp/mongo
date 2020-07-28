const router = require('express').Router();
const express = require('express');
const usuarios=require('../models/usuarios');
const cursos=require('../models/cursos');
const unidades=require('../models/unidades');
const passport=require('passport');
const {isAuthenticated} = require('../helpers/auth');

//////////////////////////////
//usuarios//////////////////////////////
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

/////////
module.exports=router;
