const router = require('express').Router();
const express = require('express');
const usuarios=require('../models/usuarios');
const cursos=require('../models/cursos');
const passport=require('passport');
const {isAuthenticated} = require('../helpers/auth');

//////////////////////////////
//usuarios//////////////////////////////
router.get('/nuevaUnidad',async (req,res)=> {
  res.render('nuevaUnidad',{});
});
//////////////////////////////

/////////
module.exports=router;
