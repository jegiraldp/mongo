const router = require('express').Router();
const express = require('express');
const usuarios=require('../models/usuarios');
const cursos=require('../models/cursos');
const passport=require('passport');
const {isAuthenticated} = require('../helpers/auth');

//////////////////////////////
//usuarios//////////////////////////////
router.get('/usuariosMain',async (req,res)=> {
  const elUsuario=req.user;
  res.render('usuariosMain',{elUsuario});
});
//////////////////////////////
router.get('/usuarios',isAuthenticated,async (req,res)=> {
  const rta=await usuarios.find();
  const elUsuario=req.user;
  res.render('usuarios',{rta,elUsuario});
});
//////////////////////////////
router.get('/nuevoUsuario',isAuthenticated,(req,res)=> {
  //const nn =req.session.mivariable;
  //delete req.session.mivariable;
  res.render('nuevoUsuario',{rta:null});
});
//////////////////////////////
router.post('/nuevoUsuario',isAuthenticated,async (req,res)=> {
  const {usuario,clave,nombre}=req.body;
  if(usuario.length==0 || nombre.length==0 || clave.length==0){
    req.flash('error_registro',"Faltan datos del usuario");
      res.redirect('/users/nuevoUsuario');
  }else {
  const el_usuario=await usuarios.findOne({usuario:usuario});
  if(el_usuario){
    req.flash('error_registro',"Nombre de usuario ya existe");
    res.redirect('/users/nuevoUsuario');
  }else{
  const nuevoUsuario=new usuarios({usuario,clave,nombre});
  nuevoUsuario.clave=await nuevoUsuario.encryptPassword(clave);
  await nuevoUsuario.save();
  req.flash('ok_registro',"Usuario registrado correctamente");
  res.redirect('/users/nuevoUsuario');
  //res.render('nuevoUsuario',{rtae:"Usuario registrado correctamente"});
}//else
}//else main
});
///////////////////////
//////////////////////////////
router.get('/editarUsuario/:_id',isAuthenticated,async(req,res)=> {
  const rta=await usuarios.findById(req.params._id);
  res.render('editarUsuario', {rta:rta,informacion:'Editando:  '+rta.usuario});
});
//////////////////////////////
router.put('/editarUsuario/:_id',isAuthenticated,async(req,res)=> {
  const {nombre,usuario}= req.body;
  await usuarios.findByIdAndUpdate(req.params._id,{nombre, usuario});
  req.flash('ok_registro',"Usuario "+usuario+" editado correctamente");
  res.redirect('/users/usuarios');

});

//////////////////////////////
router.delete('/deleteUsuario/:_id',isAuthenticated,async(req,res)=> {
const rta=await usuarios.findById(req.params._id);
await usuarios.findByIdAndDelete(req.params._id);
req.flash('ok_registro',"Usuario "+rta.usuario+"--"+rta.nombre+" eliminado correctamente");
res.redirect('/users/usuarios');

});




//////////////////////////////

/////////
module.exports=router;
