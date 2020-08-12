const mongoose = require('mongoose');
const {Schema} = mongoose;

const usersSchema= new Schema({
username:String,
googleId: String
});

module.exports=mongoose.model('users',usersSchema);
