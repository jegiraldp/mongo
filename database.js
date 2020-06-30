mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/curso',{
  useCreateIndex:true,
  useNewUrlParser:true,
  useFindAndModify:false
})
.then(bd=>console.log("conectado"))
.catch(err=>console.log("error - no conectado"))
