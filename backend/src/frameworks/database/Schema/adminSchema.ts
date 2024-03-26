import mongoose, { Types } from "mongoose";

const adminSChema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    
});

const Admin = mongoose.model("Admin", adminSChema);

export {
    Admin
};
