const mongoose = require('mongoose');
const {Schema} = mongoose;

const temasSchema= new Schema({
idUnidad:{type:String, required:true},
nombre: {type:String, required:true},
descripcion: {type:String, required:true},
orden: {type:Number, required:true},
});

module.exports=mongoose.model('temas',temasSchema);
