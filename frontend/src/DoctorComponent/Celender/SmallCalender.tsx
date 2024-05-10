import React from "react";
import "react-calendar/dist/Calendar.css";

interface SmallCalendarProps {
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  setSelectedStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setSelectedEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const SmallCalendar: React.FC<SmallCalendarProps> = ({
  selectedStartDate,
  selectedEndDate,
  setSelectedStartDate,
  setSelectedEndDate,
}) => {

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setSelectedEndDate(date);
  };

  const today = new Date().toISOString().split('T')[0]; // Get today's date in ISO format

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Select Start and End Dates:</h2>

      <div className="mb-4">
        <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
          Start Date:
        </label>
        <input
          type="date"
          id="start-date"
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedStartDate ? selectedStartDate.toISOString().split('T')[0] : ''}
          onChange={handleStartDateChange}
          min={today} // Set min attribute to today's date
        />
      </div>
    
      <div>
        <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
          End Date:
        </label>
        <input
          type="date"
          id="end-date"
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedEndDate ? selectedEndDate.toISOString().split('T')[0] : ''}
          onChange={handleEndDateChange}
          min={today} // Set min attribute to today's date
        />
      </div>
    </div>
  );
};

export default SmallCalendar;







