const mongoose = require('mongoose');
const {ObjectId}= mongoose.Schema.Types
const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    followers:[{type:ObjectId, ref:"User"}],
    following:[{type:ObjectId, ref:"User"}],
    pic:{
        type:String,
        default:"https://res.cloudinary.com/dlwthpmi0/image/upload/v1688891842/download_cmnmgg.png"
    }
})

mongoose.model("User", userSchema)
