const helpers={};

helpers.isAuthenticated=(req,res,next)=>{
  if(req.isAuthenticated){
    console.log('autenticado');
    return next();
  }else{
    console.log('No autenticado');
  req.flash('error_msg','No autorizado');
  res.redirect('/main/login');
  }
};

module.exports=helpers;
