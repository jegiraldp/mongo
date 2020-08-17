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
  res.render('usuarios',{rta,elUsuario,cantidad:rta.length});
});
//////////////////////////////
router.get('/nuevoUsuario',isAuthenticated,(req,res)=> {
  const elUsuario=req.user;
  res.render('nuevoUsuario',{rta:null,elUsuario});
});
//////////////////////////////
router.post('/nuevoUsuario',isAuthenticated,async (req,res)=> {
  const {nombre,correo}=req.body;

  if(nombre.length==0 || correo.length==0){
    req.flash('error_registro',"Faltan datos del usuario");
      res.redirect('/users/nuevoUsuario');
  }else {
  const username= correo.substring(0,correo.indexOf('@'));

  const el_usuario=await usuarios.findOne({username:username});
  if(el_usuario){
    req.flash('error_registro',"Usuario ya existe");
    res.redirect('/users/nuevoUsuario');
  }else{
    //console.log(elUserName+"-"nombre+"-"+correo);
  const nuevoUsuario=new usuarios({nombre,username,correo});
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
  const elUsuario=req.user;
  res.render('editarUsuario', {rta:rta,informacion:'Editando:  '+rta.nombre,elUsuario});
});
//////////////////////////////
router.put('/editarUsuario/:_id',isAuthenticated,async(req,res)=> {
  const {nombre,correo}= req.body;
  await usuarios.findByIdAndUpdate(req.params._id,{nombre, correo});
  req.flash('ok_registro',"Usuario "+nombre+" editado correctamente");
  res.redirect('/users/usuarios');

});

//////////////////////////////
router.delete('/deleteUsuario/:_id',isAuthenticated,async(req,res)=> {
const rta=await usuarios.findById(req.params._id);
await usuarios.findByIdAndDelete(req.params._id);
req.flash('ok_registro',"Usuario "+rta.nombre+"--"+rta.correo+" eliminado correctamente");
res.redirect('/users/usuarios');

});




//////////////////////////////

/////////
module.exports=router;
