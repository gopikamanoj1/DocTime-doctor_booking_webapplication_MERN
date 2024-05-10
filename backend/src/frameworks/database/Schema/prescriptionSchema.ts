
import mongoose, { Schema, Types } from "mongoose";

const prescriptionSchema = new mongoose.Schema({

    doctorId: { type: Schema.Types.ObjectId, required: true, ref: "Doctor" },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    appointmentId: { type: Schema.Types.ObjectId, ref: "Appointment" }, 
    prescriptionDate: {
        type: Date,
        default: Date.now,
    },
    medicines: [
        {
            name: {
                type: String,
                required: true,
            },
            dosage: {
                type: String,
                required: true,
            },
            instructions: {
                type: String,
                default: "",
            },
        },
    ],
   


});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export {
    Prescription
};
