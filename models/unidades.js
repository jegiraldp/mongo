const mongoose = require('mongoose');
const {Schema} = mongoose;

const unidadesSchema= new Schema({
idCurso:{type:String, required:true},
nombre: {type:String, required:true},
descripcion: {type:String, required:true},
orden: {type:Number, required:true},
});

module.exports=mongoose.model('unidades',unidadesSchema);
