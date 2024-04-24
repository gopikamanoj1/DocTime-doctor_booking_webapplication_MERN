import mongoose, { Types } from "mongoose";

const appointmentSchema = new mongoose.Schema({



    userId: {
        type: String
    },
 
    doctorId: {
        type: String
    },

    date: {
        type: Date
    },

    time: {
        type: String
    },
   status :{
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
   }
 

});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export {
    Appointment
};