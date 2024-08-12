import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../AxiosConfig/axiosInstance";
import { log } from "util";
import { toast } from "react-toastify";

const AddMultipleDaySlot: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("0");
  const [endTime, setEndTime] = useState("0");
  const [breakDuration, setBreakDuration] = useState(0);
  const [consultationDuration, setConsultationDuration] = useState(0);
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [totalConsultationCount, setTotalConsultationCount] = useState<
    number | null
  >(null);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  const consultationDurationOptions = [5, 10, 15, 20, 30, 45, 60, 90, 120];
  const breakDurationOptions = [5, 10, 15, 20, 30];

  const calculateConsultationCount = () => {
    if (startTime && endTime && breakDuration && consultationDuration) {
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);

      const startMinutes = startHour * 60 + startMinute;
      const endMinutes = endHour * 60 + endMinute;

      const totalMinutes = endMinutes - startMinutes;
      const consultationCount = Math.floor(
        totalMinutes / (consultationDuration + breakDuration)
      );

      setTotalConsultationCount(consultationCount);
      generateTimeSlots(
        startMinutes,
        endMinutes,
        consultationDuration,
        breakDuration
      );
    }
  };

  const generateTimeSlots = (
    startMinutes: number,
    endMinutes: number,
    consultationDuration: number,
    breakDuration: number
  ) => {
    const slots: string[] = [];
    let currentStart = startMinutes;

    while (currentStart + consultationDuration <= endMinutes) {
      const currentEnd = currentStart + consultationDuration;
      slots.push(`${formatTime(currentStart)} - ${formatTime(currentEnd)}`);
      currentStart = currentEnd + breakDuration;
    }

    setTimeSlots(slots);
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = mins.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  const handleDayChange = (day: string) => {
    setDaysOfWeek((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleDeleteSlot = (index: number) => {
    setTimeSlots((prevSlots) => prevSlots.filter((_, i) => i !== index));
  };

  const submitSlots = async () => {
    let doctorId;
    const doctorProfileString = localStorage.getItem("doctor");
    if (doctorProfileString !== null) {
      const doctorProfile = JSON.parse(doctorProfileString);
      doctorId = doctorProfile._id;
    }
    console.log("Slots submitted:", {
      doctorId,
      startDate,
      endDate,
      daysOfWeek,
      startTime,
      endTime,
      breakDuration,
      consultationDuration,
      slots: timeSlots,
      isMultipleDays: true,
    });
    try {
      const slotsData = {
        doctorId,
        startDate,
        endDate,
        daysOfWeek,
        startTime,
        endTime,
        breakDuration,
        consultationDuration,
        isMultipleDays: true,
        slots: timeSlots,
      };

      const response = await axiosInstance.post("/api/auth/addSlot", slotsData);
      console.log(response, "oooooooooooooooooooooooooooooooooooo");
      if (response.data.data == true) {
        console.log("success");
        toast.success(response.data.message);
      } else {
        console.log("failed");
        toast.warn(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg ">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Add Multiple Day Slot
      </h2>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="mb-6">
          <label className="block text-base font-semibold text-gray-800 mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-base font-semibold text-gray-800 mb-2">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="mb-6">
          <label className="block text-base font-semibold text-gray-800 mb-2">
            Start Time
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-base font-semibold text-gray-800 mb-2">
            End Time
          </label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-800 mb-2">
            Consultation Duration (minutes)
          </label>
          <select
            value={consultationDuration}
            onChange={(e) =>
              setConsultationDuration(parseInt(e.target.value, 10))
            }
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>Select Duration</option>
            {consultationDurationOptions.map((duration) => (
              <option key={duration} value={duration}>
                {duration} minutes
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-800 mb-2">
            Break Duration (minutes)
          </label>
          <select
            value={breakDuration}
            onChange={(e) => setBreakDuration(parseInt(e.target.value, 10))}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>Select Duration</option>
            {breakDurationOptions.map((duration) => (
              <option key={duration} value={duration}>
                {duration} minutes
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={calculateConsultationCount}
        className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 mb-4"
      >
        Calculate Consultation Count
      </button>

      {totalConsultationCount !== null && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Total Consultation Count per Day
          </h3>
          <p className="text-gray-700 text-xl">{totalConsultationCount}</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Time Slots
            </h3>
            {timeSlots.length > 0 ? (
              <div className="bg-white border border-gray-300 rounded-lg shadow-md">
                {timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-gray-100"
                  >
                    <span className="text-gray-700">{slot}</span>
                    <button
                      onClick={() => handleDeleteSlot(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-700">No time slots available</p>
            )}
          </div>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-800 mb-2">
          Days of the Week
        </label>
        <div className="flex flex-wrap gap-4">
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <button
              key={day}
              onClick={() => handleDayChange(day)}
              className={`px-4 py-2 rounded-lg border ${
                daysOfWeek.includes(day)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-100 text-gray-800 border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={submitSlots}
        className="w-full bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
      >
        Submit Slots
      </button>
    </div>
  );
};

export default AddMultipleDaySlot;
