const router = require('express').Router();
const express = require('express');
const usuarios=require('../models/usuarios');
const cursos=require('../models/cursos');
const unidades=require('../models/unidades');
const passport=require('passport');
const {isAuthenticated} = require('../helpers/auth');


////////////////////////////////
router.get('/nuevoTema/:_id/:estado/:idCurso',isAuthenticated,async (req,res)=> {
  const elCurso=await cursos.findById(req.params.idCurso);
  const laUnidad=await unidades.findById(req.params._id);
  const estado=req.params.estado;
/*  if(estado=="2"){
    res.render('nuevoTema',{elCurso, error_registro_unidad:"Faltan datos de la unidad"});
  }else{
    if(estado=="3"){
  res.render('nuevoTema',{elCurso, error_registro_unidad:"Nombre de unidad ya existe"});
}else{*/
  res.render('nuevoTema',{elCurso,laUnidad, error_registro_unidad:""});
//  }
//}
});
//////////////////////////////


//////////////////////////////
module.exports=router;
