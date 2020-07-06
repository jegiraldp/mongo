const mongoose = require('mongoose');
const bcryptjs=require('bcryptjs');
const {Schema} = mongoose;

const userSchema= new Schema({
usuario: {type:String, required:true},
clave: {type:String, required:true},
nombre: {type:String, required:true}
});

userSchema.methods.encryptPassword=async function (clave) {
const salt= await bcryptjs.genSalt(10);
const cifrada=bcryptjs.hash(clave, salt);
return cifrada;
};

userSchema.methods.matchPassword=async function (clave) {
return await bcryptjs.compare(clave,this.clave);

};

module.exports=mongoose.model('usuarios',userSchema);
