import React, { useState } from 'react';
import Footer from '../components/Footer/Footer';
import AddSingleDaySlot from '../DoctorComponent/Slot/AddSingleDaySlot';
import AddMultipleDaySlot from '../DoctorComponent/Slot/AddMultipleDaySlot';
import CurrentSlots from '../DoctorComponent/Slot/CurrentSlots';

function SlotCreatePage() {
  const [showSingleDaySlot, setShowSingleDaySlot] = useState(false);
  const [showMultipleDaySlot, setShowMultipleDaySlot] = useState(false);
  const [currentSlot, setCurrentSlot]=useState(false)

  const handleShowSingleDaySlot = () => {
    setShowSingleDaySlot(true);
    setShowMultipleDaySlot(false);
    setCurrentSlot(false)
  };

  const handleShowMultipleDaySlot = () => {
    setShowSingleDaySlot(false);
    setShowMultipleDaySlot(true);
    setCurrentSlot(false)
  };

  const handleShowCurrentSlot = ()=>{
    setShowMultipleDaySlot(false)
    setShowSingleDaySlot(false)
    setCurrentSlot(true)

  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Manage Slots</h1>
          <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 mb-8">
            <button
              onClick={handleShowSingleDaySlot}
              className={`flex-1 py-2 px-4 rounded shadow-md transition-all duration-300 mb-4 sm:mb-0 ${
                showSingleDaySlot
                  ? 'bg-cyan-950 text-white shadow-lg'
                  : 'text-blue-600 hover:underline'
              }`}
            >
              Add Single Day Slot
            </button>
            <button
              onClick={handleShowMultipleDaySlot}
              className={`flex-1 py-2 px-4 rounded shadow-md transition-all duration-300 ${
                showMultipleDaySlot
                  ? 'bg-cyan-950 text-white shadow-lg'
                  : 'text-blue-600 hover:underline'
              }`}
            >
            
              Add Multiple Day Slot
            </button>


            <button
              onClick={handleShowCurrentSlot}
              className={`flex-1 py-2 px-4 rounded shadow-md transition-all duration-300 ${
                currentSlot
                  ? 'bg-cyan-950 text-white shadow-lg'
                  : 'text-blue-600 hover:underline'
              }`}
            >
            
              Your Current Slots
            </button>
            
          </div>
          <div className="my-8">
            {showSingleDaySlot && <AddSingleDaySlot />}
            {showMultipleDaySlot && <AddMultipleDaySlot />}
            {currentSlot && <CurrentSlots/>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SlotCreatePage;
