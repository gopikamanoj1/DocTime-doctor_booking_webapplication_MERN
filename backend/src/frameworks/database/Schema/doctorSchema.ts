// Doctor Model

import mongoose, { Types } from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
  },


  password: {
    type: String
  },


  specialization: {
    type: String,
  },



  image: String,

  phone: {
    type: String,
  },


  email: {
    type: String,
    unique: true,
  },


  address: [{
    street: String,
    city: String,
    state: String,
    zipCode: String,
  }],

  age: {
    type: Number
  },
  dob: {
    type: Date
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
  }],
  isBlocked: {
    type: Boolean,
    default: false
}




});

const Doctor = mongoose.model("Doctor", doctorSchema);

export {
  Doctor
};
