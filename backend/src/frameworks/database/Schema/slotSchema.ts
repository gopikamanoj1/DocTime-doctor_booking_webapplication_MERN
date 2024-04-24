
import mongoose, { Types } from "mongoose";

const slotSchema = new mongoose.Schema({

  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  slotTime: {
    type: [String], 
    required: true
  },

  
  available: {
    type: Boolean,
    default: true
  }


});

slotSchema.index({ doctor: 1, startDate: 1, endDate: 1 }, { unique: true });


const Slot = mongoose.model("Slot", slotSchema);

export {
  Slot
};