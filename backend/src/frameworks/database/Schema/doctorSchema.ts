// Doctor Model

import mongoose, { Types } from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },


  password: {
    type: String
  },


  specialization: {
    type: String,
    // required: true,
  },

  // image: 
  //   {
  //     url: {
  //       type: String,
  //       required: true,
  //     },
  //   },

  image: String, // Updated to store image URL

  phone: {
    type: String,
    // required: true,
  },


  email: {
    type: String,
    // required: true,
    unique: true,
  },


  address:[{
    street: String,
    city: String,
    state: String,
    zipCode: String,
  }],

age:{
  type:Number
},
dob:{
  type:Date
},

  fees: {
    type: Number
  },



  kycStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },




  kycDetails: [{
    _id: false,
    certificateImage: { type: String },
    qualificationImage: { type: String },
    aadhaarNumber: String,
    yearsOfExperience: Number,
    hospitalName: String
  }]




});

const Doctor = mongoose.model("Doctor", doctorSchema);

export {
  Doctor
};
