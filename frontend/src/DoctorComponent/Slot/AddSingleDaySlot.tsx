
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../AxiosConfig/axiosInstance';

const AddSingleDaySlot = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [breakDuration, setBreakDuration] = useState(0);
  const [consultationDuration, setConsultationDuration] = useState(0);
  const [totalConsultationCount, setTotalConsultationCount] = useState(Number);
  const [timeSlots, setTimeSlots] = useState([]);

  const consultationDurationOptions = [ 20, 30, 45, 60, 90, 120];
  const breakDurationOptions = [0, 5, 10, 15, 20, 30];

  const calculateConsultationCount = () => {
    if (startTime && endTime && breakDuration && consultationDuration) {
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);

      const startMinutes = startHour * 60 + startMinute;
      const endMinutes = endHour * 60 + endMinute;

      const totalMinutes = endMinutes - startMinutes;
      const consultationCount = Math.floor(totalMinutes / (consultationDuration + breakDuration));

      setTotalConsultationCount(consultationCount);
      generateTimeSlots(startMinutes, endMinutes, consultationDuration, breakDuration);
    }
  };

  const generateTimeSlots = (startMinutes:any, endMinutes:any, consultationDuration:any, breakDuration:any) => {
    const slots:any = [];
    let currentStart = startMinutes;

    while (currentStart + consultationDuration <= endMinutes) {
      const currentEnd = currentStart + consultationDuration;
      slots.push(`${formatTime(currentStart)} - ${formatTime(currentEnd)}`);
      currentStart = currentEnd + breakDuration;
    }

    setTimeSlots(slots);
  };

  const formatTime = (minutes:any) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours < 12 ? 'AM' : 'PM';
    const formattedHours = (hours % 12) || 12;
    const formattedMinutes = mins.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  const handleDeleteSlot = (index:number) => {
    setTimeSlots(prevSlots => prevSlots.filter((_, i) => i !== index));
  };

  const submitSlots = async () => {
    let doctorId;
    const doctorProfileString = localStorage.getItem('doctor');
    if (doctorProfileString !== null) {
      const doctorProfile = JSON.parse(doctorProfileString);
      doctorId = doctorProfile._id;
    }

    try {
      const slotsData = {
        doctorId,
        startDate: date,
        endDate: date,
        startTime,
        endTime,
        breakDuration,
        consultationDuration,
        isMultipleDays: false,
        slots:timeSlots
      };

      const response = await axiosInstance.post('/api/auth/addSlot', slotsData);
      if (response) {
        console.log('Success');
      } else {
        console.log('Failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-100 to-green-200 rounded-lg">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Add Single Day Slot</h2>
      {/* Form Fields */}
      <div className="mb-6 grid grid-cols-2 gap-6">
        {/* Date */}
        <div>
          <label htmlFor="date" className="block mb-2 text-gray-800">Date</label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        {/* Start Time */}
        <div>
          <label htmlFor="startTime" className="block mb-2 text-gray-800">Start Time</label>
          <input type="time" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        {/* End Time */}
        <div>
          <label htmlFor="endTime" className="block mb-2 text-gray-800">End Time</label>
          <input type="time" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        {/* Break Duration */}
        <div>
          <label htmlFor="breakDuration" className="block mb-2 text-gray-800">Break Duration</label>
          <select id="breakDuration" value={breakDuration} onChange={(e) => setBreakDuration(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-md">
            {breakDurationOptions.map((duration) => (
              <option key={duration} value={duration}>{duration} minutes</option>
            ))}
          </select>
        </div>
        {/* Consultation Duration */}
        <div>
          <label htmlFor="consultationDuration" className="block mb-2 text-gray-800">Consultation Duration</label>
          <select id="consultationDuration" value={consultationDuration} onChange={(e) => setConsultationDuration(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-md">
            {consultationDurationOptions.map((duration) => (
              <option key={duration} value={duration}>{duration} minutes</option>
            ))}
          </select>
        </div>
      </div>

      {/* Total Consultation Count */}
      <div className="mb-6">
        <button type="button" className="w-full bg-green-800 text-white px-3 py-2 rounded-md" onClick={calculateConsultationCount}>
          Calculate Total Consultation Count
        </button>
        {totalConsultationCount !== null && (
          <div className="mt-4 text-green-800 font-semibold">
            Total Consultation Count: {totalConsultationCount}
          </div>
        )}
      </div>

      {/* Time Slots */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-800">Time Slots</label>
        <div className="flex flex-wrap gap-2">
          {timeSlots.map((slot, index) => (
            <div key={index} className="flex items-center bg-gray-200 px-3 py-2 rounded-md">
              {slot}
              <FontAwesomeIcon icon={faTrashAlt} className="ml-2 text-red-600 cursor-pointer" onClick={() => handleDeleteSlot(index)} />
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button type="button" className="bg-green-800 text-white px-6 py-3 rounded-md" onClick={submitSlots}>
          Submit Slots
        </button>
      </div>
    </div>
  );
};

export default AddSingleDaySlot;

