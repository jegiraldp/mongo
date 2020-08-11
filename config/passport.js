const passport = require('passport');
const localStrategy=require('passport-local').Strategy;
const usuarios=require('../models/usuarios');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys=require('./keys');

passport.use(new localStrategy({
  usernameField:'email',
}, async (email, password, done)=>{
  const user=await usuarios.findOne({usuario:email});

  if(!user) {
    return done(null,false,{message:'Usuario no autorizado'});
  }else{
    //console.log(user);
    const match= await user.matchPassword(password);
    if(match){

      return done(null, user);
    }
    else{
      return done(null, false, {message:'Clave incorrecta'});
    }
  }
}

));

passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
  callbackURL: "/auth/google/redirect"
},  accessToken => {
      console.log("access token: ", accessToken);
    })
    );


passport.serializeUser((user, done)=>{
  done(null, user.id);
});

passport.deserializeUser((id, done)=>{
  usuarios.findById(id, (err,user)=>{
      done(err,user);
  });
});
