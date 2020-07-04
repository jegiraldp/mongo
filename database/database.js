mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/ot2020',{
  useCreateIndex:true,
  useNewUrlParser:true,
  useFindAndModify:false
})
.then(bd=>console.log("conectado"))
.catch(err=>console.log("error - no conectado"))
