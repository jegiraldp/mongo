mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema= new Schema({
usuario: {type:String, required:true},
clave: {type:String, required:true}
});

module.exports=mongoose.model('usuarios',userSchema);
