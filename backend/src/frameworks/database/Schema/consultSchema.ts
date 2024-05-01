
import mongoose from "mongoose";

const consultSchema = new mongoose.Schema({
  
    userId: {
        type: String
    },
 
    doctorId: {
        type: String
    },
    appointmentId:{
        type:String
    },
    read:{
        type:Boolean,
        default:false
    },
    roomId:{
        type:String
    }
},
    {
        timestamps: true

    });

const Consult = mongoose.model("Consult", consultSchema);

export {
    Consult
};
