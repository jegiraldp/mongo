const router = require('express').Router();
const express = require('express');
const usuarios=require('../models/usuarios');
const cursos=require('../models/cursos');
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

  res.render('nuevaUnidad',{elCurso, error_registro_unidad:""});
}
});
//////////////////////////////

router.post('/nuevaUnidad',isAuthenticated,async (req,res)=> {
const {_id,nombre,descripcion}=req.body;
if(nombre.length==0 || descripcion.length==0){
res.redirect('/units/nuevaUnidad/'+_id+'/2');
}

});

/////////
module.exports=router;
