const passport = require('passport');
const localStrategy=require('passport-local').Strategy;
const usuarios=require('../models/usuarios');
const users=require('../models/users');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.use(new localStrategy({
  usernameField:'email',
}, async (email, password, done)=>{
  const user=await usuarios.findOne({usuario:email});

  if(!user) {
    return done(null,false,{message:'Usuario no autorizado'});
  }else{

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
    clientID: '360080404512-1sipfr6kemrm7tbpp6u01jb3qgqa4nlg.apps.googleusercontent.com',
    clientSecret: 'PHScm2vvjGPPVKdvZgWMFgMb',
    callbackURL: "http://localhost:8080/main/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
