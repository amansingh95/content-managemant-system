const mongoose=require('mongoose');
const UserSchemma=new mongoose.Schema({
    name:{
        required:true,
        type: String
    },
    email:{
        required:true,
        type:String,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports =User= mongoose.model("user",UserSchemma);

