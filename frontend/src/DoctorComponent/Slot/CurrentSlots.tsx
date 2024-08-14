import React, { useEffect, useState } from 'react';
import axiosInstance from '../../AxiosConfig/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

interface Slot {
  _id: string;
  startDate: string;
  endDate: string;
  isMultipleDays: boolean;
  slots: {
    _id: string;
    time: string;
    duration: string;
    available: boolean;
    booked: boolean;
    bookedDate: string | null;
  }[];
}

const CurrentSlots: React.FC = () => {
  const [currentSlots, setCurrentSlots] = useState<Slot[]>([]);

  useEffect(() => {
    fetchCurrentSlots();
  }, []);

  const fetchCurrentSlots = async () => {
    let doctorId;
    const doctorProfileString = localStorage.getItem("doctor");
    if (doctorProfileString !== null) {
      const doctorProfile = JSON.parse(doctorProfileString);
      doctorId = doctorProfile._id;
    }
    try {
      const response = await axiosInstance.post(
        "/api/auth/getAlreadyScheduledSlotes",
        { doctorId: doctorId }
      );

      console.log(response, "vvvvvvv");

      if (response.data.status === true) {
        setCurrentSlots(response.data.data);
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSlot = async (slotId: string) => {
    try {
      const response = await axiosInstance.delete(`/api/auth/deleteSlot?slotId=${slotId}`);
      if (response.data.status === true) {
        toast.success(response.data.message);
        fetchCurrentSlots(); // Refresh slots after deletion
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg">
      <h2 className="text-3xl font-bold text-yellow-800 mb-6 text-center">Current Slots</h2>
      <div className="grid grid-cols-1 gap-4">
        {currentSlots.length > 0 ? (
          currentSlots.map((slot, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p className="text-gray-700">Date: {slot.startDate.split('T')[0]}</p>
                <div className="text-gray-700">Time: 
                  {slot.slots.map((slotItem) => (
                    <span key={slotItem._id} className="block">{slotItem.time}</span>
                  ))}
                </div>
              </div>
              <button onClick={() => handleDeleteSlot(slot._id)} className="text-red-500 hover:text-red-700">
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No slots available</p>
        )}
      </div>
    </div>
  );
};

export default CurrentSlots;
