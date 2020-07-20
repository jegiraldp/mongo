const router = require('express').Router();
const express = require('express');
const usuarios=require('../models/usuarios');
const cursos=require('../models/cursos');
const passport=require('passport');
const {isAuthenticated} = require('../helpers/auth');

//////////////////////////////
//usuarios//////////////////////////////
router.get('/nuevaUnidad/:_id',async (req,res)=> {
  const rta=await cursos.findById(req.params._id);
  res.render('nuevaUnidad',{rta});
});
//////////////////////////////

/////////
module.exports=router;
