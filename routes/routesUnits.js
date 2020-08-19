const router = require('express').Router();
const express = require('express');
const usuarios=require('../models/usuarios');
const cursos=require('../models/cursos');
const temas=require('../models/temas');
const unidades=require('../models/unidades');
const passport=require('passport');
const {isAuthenticated} = require('../helpers/auth');

//////////////////////////////
//////////////////////////////
router.get('/inicioUnidad/:_id/:idCurso',isAuthenticated,async (req,res)=> {
  const rtaUnidad=await unidades.findById(req.params._id);
  const rtaCurso=await cursos.findById(req.params.idCurso);
  const losTemas=await temas.find({idUnidad:rtaUnidad._id}).sort({orden:1});
  for (var i = 0; i < losTemas.length; i++) {
    orden=(i+1);
    await temas.findByIdAndUpdate(losTemas[i]._id,{orden});
    losTemas[i].orden=orden;
  }

  res.render('unidadInicio',{rtaUnidad,rtaCurso,losTemas,cantidad:losTemas.length});
});
//////////////////////////////
//////////////////////////////
router.get('/cambiarOrden/:_id/:orden/:opcion',async (req,res)=> {
  const elUsuario=req.user;
  const opcion=req.params.opcion;
  const orden=req.params.orden;
  const laUnidad = await unidades.findById(req.params._id);
  const elCursoId=laUnidad.idCurso;
  if(opcion=="1"){

  const ordenMas=1+parseInt(orden);
  const ordenMenos=parseInt(orden)-1;
  await unidades.updateOne({idCurso:elCursoId,orden:ordenMenos},{$set:{orden:orden}});
  await unidades.findByIdAndUpdate(req.params._id,{orden:ordenMenos});
  }//opcion
  if(opcion=="2"){

  const ordenMas=1+parseInt(orden);
  const ordenMenos=parseInt(orden)-1;
  await unidades.updateOne({idCurso:elCursoId,orden:ordenMas},{$set:{orden:orden}});
  await unidades.findByIdAndUpdate(req.params._id,{orden:ordenMas});
  }//opcion


  const contador=0;
  const rta=await cursos.findById(elCursoId);
  const lasUnidades=await unidades.find({idCurso:elCursoId}).sort({orden:1});
  res.render('cursoInicio',{rta,lasUnidades,cantidad:lasUnidades.length,elUsuario});

});
//////////////////////////////
////////////////////////////////
router.get('/nuevaUnidad/:_id/:estado',isAuthenticated,async (req,res)=> {
  const elCurso=await cursos.findById(req.params._id);
    const elUsuario=req.user;
  const estado=req.params.estado;
  if(estado=="2"){
    res.render('nuevaUnidad',{elCurso, error_registro_unidad:"Faltan datos de la unidad",elUsuario});
  }else{
    if(estado=="3"){
  res.render('nuevaUnidad',{elCurso, error_registro_unidad:"Título de unidad ya existe",elUsuario});
    }else{
  res.render('nuevaUnidad',{elCurso, error_registro_unidad:"",elUsuario});
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
  const elUsuario=req.user;
  const rta=await unidades.findById(req.params._id);
  res.render('editarUnidad', {rta:rta,informacion:rta.nombre,elUsuario});
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
