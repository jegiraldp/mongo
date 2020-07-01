const passport = require('passport');
const localStrategy=require('passport-local').Strategy;
const usuarios=require('../models/usuarios');

passport.use(new localStrategy({
  usernameField:'email',
}, async (email, password, done)=>{
  const user=await usuarios.findOne({usuario:email});

  if(!user) {
    return done(null,false,{message:'Usuario no encontrado'});
  }else{
    //console.log(user);
    const match= await user.matchPassword(password);
    if(match){
      
      return done(null, user,{message:'Bienvenido'});
    }
    else{
      return done(null, false, {message:'Clave incorrecta'});
    }
  }
}

));

passport.serializeUser((user, done)=>{
  done(null, user.id);
});

passport.deserializeUser((id, done)=>{
  usuarios.findById(id, (err,user)=>{
      done(err,user);
  });
});
