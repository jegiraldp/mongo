const router = require('express').Router();
const express = require('express');
const passport=require('passport');
const {isAuthenticated} = require('../helpers/auth');
//////////////////////////////
//google
router.get('/google',passport.authenticate('google', {
   scope: ["profile", "email"]
}));
//////////////
router.get("/google/redirect",passport.authenticate("google"),(req,res)=>{
  //res.send(req.user);
  res.send("you reached the redirect URI");
});


module.exports=router;
