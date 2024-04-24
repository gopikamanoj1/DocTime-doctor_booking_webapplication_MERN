import React, { useState } from 'react';
import moment from 'moment';
import { TimeSlot } from '../../Interfaces/Doctor/DoctorInteface';


interface TimePickerModalProps {
  onTimeSelect: (selectedSlots: TimeSlot[]) => void;
}

const TimePickerModal: React.FC<TimePickerModalProps> = ({ onTimeSelect }) => {
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);

  // Example time slots for demonstration
  const timeSlots: TimeSlot[] = [];
  const startTime = new Date(2023, 3, 1, 9, 0); // 9 AM
  const endTime = new Date(2023, 3, 1, 18, 0); // 6 PM
 
  let currentTime = startTime;
  while (currentTime < endTime) {
    const slotStart = new Date(currentTime);
    const slotEnd = new Date(currentTime);
    slotEnd.setMinutes(slotStart.getMinutes() + 60); // 1 hour slot for consultation

    if (slotEnd <= endTime) {
      timeSlots.push({ start: slotStart, end: slotEnd });
    }

    currentTime = new Date(slotEnd);
    currentTime.setMinutes(currentTime.getMinutes() + 15); // 15 minutes break
  }

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlots(prevSlots => {
      if (prevSlots.some(s => s.start.getTime() === slot.start.getTime())) {
        return prevSlots.filter(s => s.start.getTime() !== slot.start.getTime());
      } else {
        return [...prevSlots, slot];
      }
    });
  };

  const handleSaveSlots = () => {
    onTimeSelect(selectedSlots);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Select Time Slots</h2>
      <div className="space-y-2">
        {timeSlots.map((slot, index) => (
          <div key={index} className="flex items-center justify-between">
            <span>{moment(slot.start).format('h:mm A')} - {moment(slot.end).format('h:mm A')}</span>
            <input
              type="checkbox"
              checked={selectedSlots.some(s => s.start.getTime() === slot.start.getTime())}
              onChange={() => handleSlotSelect(slot)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default TimePickerModal;
