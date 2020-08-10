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
router.get('/editarTema/:_id',isAuthenticated,async(req,res)=> {
  const rta=await temas.findById(req.params._id);
  const rtaUnidad=await unidades.findById(rta.idUnidad);
  res.render('editarTema', {rta,informacion:rta.nombre,rtaUnidad});
});

//////////////////////////////
router.put('/editarTema/:_id',isAuthenticated,async(req,res)=> {
  const {nombre,descripcion}= req.body;
  const rtaTema=await temas.findById(req.params._id);
  const rtaUnidad=await unidades.findById(rtaTema.idUnidad);
  await temas.findByIdAndUpdate(req.params._id,{nombre, descripcion});
  req.flash('ok_editarTema',nombre);
  res.redirect('/units/inicioUnidad/'+rtaTema.idUnidad+'/'+rtaUnidad.idCurso);

});
//////////////////////////////
router.get('/inicioTema/:_id/:idUnidad',isAuthenticated,async (req,res)=> {
  const rtaUnidad=await unidades.findById(req.params.idUnidad);
  const rtaTema=await temas.findById(req.params._id);
  const rtaCursoId=rtaUnidad.idCurso;
  //const losTemas=await temas.find({idUnidad:rtaUnidad._id}).sort({orden:1});

  res.render('temaInicio',{rtaUnidad,rtaTema,rtaCursoId});
});
//////////////////////////////
router.delete('/deleteTema/:_id',isAuthenticated,async(req,res)=> {
const rta=await temas.findById(req.params._id);
const rtaUnidad= await unidades.findById(rta.idUnidad);

await temas.findByIdAndDelete(req.params._id);
req.flash('ok_registro',"Tema "+rta.nombre+" eliminado correctamente");
  res.redirect('/units/inicioUnidad/'+rta.idUnidad+'/'+rtaUnidad.idCurso);

});

///////////////////////////////////
router.get('/cambiarOrden/:_id/:orden/:opcion',async (req,res)=> {
  const opcion=req.params.opcion;
  const orden=req.params.orden;
  const elTema = await temas.findById(req.params._id);
  const rtaUnidad = await unidades.findById(elTema.idUnidad);
  const rtaCurso = await cursos.findById(rtaUnidad.idCurso);
  const elCursoId=rtaUnidad.idCurso;

  if(opcion=="1"){

  const ordenMas=1+parseInt(orden);
  const ordenMenos=parseInt(orden)-1;
  await temas.updateOne({idUnidad:rtaUnidad._id,orden:ordenMenos},{$set:{orden:orden}});
  await temas.findByIdAndUpdate(req.params._id,{orden:ordenMenos});
  }//opcion
  if(opcion=="2"){

    const ordenMas=1+parseInt(orden);
    const ordenMenos=parseInt(orden)-1;
    await temas.updateOne({idUnidad:rtaUnidad._id,orden:ordenMas},{$set:{orden:orden}});
    await temas.findByIdAndUpdate(req.params._id,{orden:ordenMas});
  }//opcion


  const losTemas=await temas.find({idUnidad:rtaUnidad._id}).sort({orden:1});
  res.render('unidadInicio',{rtaUnidad,rtaCurso,losTemas,cantidad:losTemas.length});

});
//////////////////////////////

//////////////////////////////
module.exports=router;
