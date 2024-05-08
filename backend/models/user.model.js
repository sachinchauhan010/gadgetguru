const mongoose= require('mongoose');

const userSchema =mongoose.Schema({
    fullName:{
        type:String,
        required: true,
    },
    phoneNo:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
    },
    

}, {timeStamp:true});

const userModel=mongoose.model("userModel", userSchema);
module.exports=userModel;