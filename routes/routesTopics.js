const router = require('express').Router();
const express = require('express');
const usuarios=require('../models/usuarios');
const cursos=require('../models/cursos');
const unidades=require('../models/unidades');
const temas=require('../models/temas');
const passport=require('passport');
const {isAuthenticated} = require('../helpers/auth');


////////////////////////////////
router.get('/nuevoTema/:idUnidad/:estado/:idCurso',isAuthenticated,async (req,res)=> {
  const elCurso=await cursos.findById(req.params.idCurso);
  const laUnidad=await unidades.findById(req.params.idUnidad);
  const estado=req.params.estado;
  //console.log('estado '+estado);

  if(estado=="2"){
    res.render('nuevoTema',{elCurso,laUnidad, ok_nuevo_tema:"",error_registro_tema:"Faltan datos del tema"});
  }

    if(estado=="3"){
  res.render('nuevoTema',{elCurso,laUnidad, ok_nuevo_tema:"",error_registro_tema:"Título del tema ya existe"});
}
  if(estado=="1"){
  res.render('nuevoTema',{elCurso,laUnidad,ok_nuevo_tema:"Tema creado con exito",error_registro_tema:""});
}

if(estado=="5"){
res.render('nuevoTema',{elCurso,laUnidad,ok_nuevo_tema:"",error_registro_tema:""});
}

});
//////////////////////////////
//////////////////////////////

router.post('/nuevoTema',isAuthenticated,async (req,res)=> {
  const {idUnidad,nombre,descripcion}=req.body;
  const theUnidad=await unidades.findById(idUnidad);
  if(nombre.length==0 || descripcion.length==0){
  res.redirect('/topics/nuevoTema/'+idUnidad+'/2/'+theUnidad.idCurso);
}else{
    const existeNombre=await temas.findOne({nombre:nombre,idUnidad:idUnidad});
    if(existeNombre){
      res.redirect('/topics/nuevoTema/'+idUnidad+'/3/'+theUnidad.idCurso);
    }else{
    const cant=await temas.find({idUnidad:idUnidad}).countDocuments();
    const orden= (cant+1);
    const nuevoTema=new temas({idUnidad:idUnidad,nombre,descripcion,orden});
    //console.log(nuevoTema);
    await nuevoTema.save();
    res.redirect('/topics/nuevoTema/'+idUnidad+'/1/'+theUnidad.idCurso);
  }//else existeNombre
  }//else vacio
});

//////////////////////////////


//////////////////////////////
module.exports=router;
