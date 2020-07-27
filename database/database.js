mongoose = require("mongoose");
//mongoose.connect('mongodb://localhost/ot2020',{
mongoose.connect('mongodb+srv://admin:123@clusteropentopic.8pddu.mongodb.net/ot2020?retryWrites=true&w=majority',{
  useCreateIndex:true,
  useNewUrlParser:true,
  useFindAndModify:false
})
.then(bd=>console.log("conectado"))
.catch(err=>console.log("error - no conectado"))


//.then(bd=>console.log("conectado"))
