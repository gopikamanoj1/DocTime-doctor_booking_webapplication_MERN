



import mongoose from 'mongoose';

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
    type: Date
  },
  isMultipleDays: {
    type: Boolean,
    default: false
  },
  daysOfWeek: [String],
  slots: [{
    time: String,
    duration: String, 
    available: {
      type: Boolean,
      default: true
    }
  }],

});


const Slot = mongoose.model('Slot', slotSchema);

export { Slot };
