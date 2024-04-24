import mongoose, { Types } from "mongoose";

const userSChema = new mongoose.Schema({
  
    name:String,

    email:String,

    // password:String,
    password: { type: String, required: true } ,

    phone:Number,

    dob:Date,

   image:String,

    gender:{
        type:String,
        enum:['male','female']
    },

    address: [{
        street: String,
        city: String,
        state: String
    }],

    // Contry:String,

    // City:String,

    bloodGroup:String,

    age:Number,

    isBlocked: {
        type: Boolean,
        default: false
    },


    isAdmin:{
        default:Number
    }
      
   });

const User = mongoose.model("User", userSChema);

export {
    User,
};



