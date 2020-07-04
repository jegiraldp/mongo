const mongoose = require('mongoose');
const {Schema} = mongoose;

const cursosSchema= new Schema({
nombre: {type:String, required:true},
creador: {type:String, required:true},
correo: {type:String, required:true},
fecha: {type:String, required:true},
descripcion: {type:String, required:true}
});

module.exports=mongoose.model('cursos',cursosSchema);
