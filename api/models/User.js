const mongoose=require("mongoose");
const UserScheama=new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String
})

const Usermodel=mongoose.model('user',UserScheama);

module.exports=Usermodel;