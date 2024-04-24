import React, { useEffect, useState } from "react";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { toast } from "react-toastify";
import SmallCalendar from "../Celender/SmallCalender";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import "./c.css";
import Button from "@mui/material/Button";
import axiosInstance from "../../AxiosConfig/axiosInstance";
import { useNavigate } from "react-router-dom";

const DoctorCalendar: React.FC = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [alreadyScheduledSlotes, setAlreadyScheduledSlotes] = useState<any[]>(
    []
  );
  const [selectedSlots, setSelectedSlots] = useState<any[]>([]); // Corrected type
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const doctor = useSelector((state: any) => state.persisted.doctorAuth);
  const navigate=useNavigate()
  console.log(alreadyScheduledSlotes, "hhhh");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post(
          "/api/auth/getAlreadyScheduledSlotes",
          { doctorId: doctor.doctor._id }
        );
        if (response) {
          setAlreadyScheduledSlotes(response.data.data);
        }
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchData();
  }, [navigate]);

  const handleDeleteForScheduledSlot = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/auth/handleDeleteForScheduledSlot",
        { doctorId: doctor.doctor._id }
      );

      if(response){
       
      }

    } catch (error) {}
  };

  const handleConfirmSlots = () => {
    if (selectedStartDate && selectedEndDate && selectedSlots.length > 0) {
      const newSlots = selectedSlots.map((slot) => {
        const newSlot = `${moment(slot.start).format("h:mm A")} - ${moment(
          slot.end
        ).format("h:mm A")}`;
        return newSlot;
      });

      const filteredNewSlots = newSlots.filter(
        (newSlot) => !selectedTimeSlots.includes(newSlot)
      );

      setSelectedSlots((prevSlots) =>
        prevSlots.filter((prevSlot) => !filteredNewSlots.includes(prevSlot))
      );

      setSelectedTimeSlots((prevSlots) => [...prevSlots, ...filteredNewSlots]);
    } else {
      toast.warn("Please select a start date, end date, and time slots.");
    }
  };

  console.log(selectedTimeSlots, "setSelectedTimeSlots");

  const timeSlots: { start: Date; end: Date }[] = []; // Initialize array

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

  const handleSlotSelect = (slot: any) => {
    setSelectedSlots((prevSlots) => {
      if (prevSlots.some((s) => s.start.getTime() === slot.start.getTime())) {
        return prevSlots.filter(
          (s) => s.start.getTime() !== slot.start.getTime()
        );
      } else {
        return [...prevSlots, slot];
      }
    });
  };

  const handleConfirmAvailableSlots = async () => {
    let doctorId; // Declare doctorId variable outside the if block
    // Retrieve the doctor profile from local storage
    const doctorProfileString = localStorage.getItem("doctor");
    if (doctorProfileString !== null) {
      const doctorProfile = JSON.parse(doctorProfileString);
      doctorId = doctorProfile._id; // Assign value to doctorId
    }
    try {
      const slotsData = {
        doctorId, // Use doctorId in slotsData
        startDate: selectedStartDate,
        endDate: selectedEndDate,
        slotTime: selectedTimeSlots,
      };

      console.log(slotsData, "slotsDataslotsDataslotsData");

      // if(!slotsData.startDate || slotsData.endDate){
      //   toast.warn("Please Select Date")
      // }

      const response = await axiosInstance.post(
        "/api/auth/addSlot",
        slotsData,
      );
      if (slotsData.slotTime.length == 0) {
        toast.warn("Add Atleast One Slot");
      } else {
        if (response) {
          toast.success("Slot Added Succesfully");
          // navigate("/doctorHome")

          setSelectedSlots([]);
          setSelectedEndDate(null);
          setSelectedStartDate(null);
          // setSelectedTimeSlots([])
        }

        console.log(response.data);
      }
    } catch (error) {
      // Handle errors
      console.error("Error in saving the slots to the backend:", error);
    }
  };

  const handleDelete = (index:any) => {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Make the API call with axios to delete the slot by index
        axiosInstance
          .delete(`/api/auth/delete-slot/${index}`) // Adjust endpoint as needed
          .then((response:any) => {
            if (response.status === 200) { // Check for successful response
              // Update the local state to reflect the deletion
              const updatedSlots = [...selectedTimeSlots]; // Create a copy of selectedTimeSlots
              updatedSlots.splice(index, 1); // Remove the slot at the specified index
              setSelectedTimeSlots(updatedSlots); // Update the state
  
              Swal.fire("Deleted!", "Your time slot has been deleted.", "success");
            } else {
              Swal.fire("Error", "Deletion failed. Please try again.", "error");
            }
          })
          .catch((error) => {
            // If an error occurs, handle it and inform the user
            Swal.fire("Error", "An error occurred during deletion.", "error");
            console.error(error);
          });
      }
    });
  };

  return (
    <div className="">
      <div className="mx-auto p-4 flex bg-cyan-50">
        <div className="w-1/2 pr-8 pl-8   flex justify-center items-center  ">
          <div className="mb-4">
            <div className="mb-4 p-10">
              <SmallCalendar
                selectedStartDate={selectedStartDate}
                selectedEndDate={selectedEndDate}
                setSelectedStartDate={setSelectedStartDate}
                setSelectedEndDate={setSelectedEndDate}
              />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">Select Time Slots</h2>
                <div className="space-y-2 p-6 ">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      className={`checkbox-button ${
                        selectedSlots.some(
                          (s) => s.start.getTime() === slot.start.getTime()
                        ) && "selected"
                      }`}
                      onClick={() => handleSlotSelect(slot)}
                    >
                      <span className="text-xl">
                        {moment(slot.start).format("h:mm A")} -{" "}
                        {moment(slot.end).format("h:mm A")}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className=" rounded-lg  text-center">
              <button
                className="bg-cyan-950 hover:bg-cyan-900 text-white font-bold py-2 px-8 rounded "
                onClick={handleConfirmSlots}
              >
                Save Date And Time
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2 pl-4 p-10">
          <h2 className="text-xl font-semibold mb-2 text-rose-800">
            Selected Date:
          </h2>
          {selectedStartDate && selectedEndDate ? (
            <p className="mb-4">
              {`${moment(selectedStartDate).format("MMM D, YYYY")} - ${moment(
                selectedEndDate
              ).format("MMM D, YYYY")}`}
            </p>
          ) : (
            "No date Scheduled"
          )}

          <div className="overflow-x-auto ">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-rose-500 text-center">
                    Time Slot
                  </th>
                  {/* <th className="px-4 py-2 text-rose-500">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {selectedTimeSlots.map((slot, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2 text-center">{slot}</td>

                    <td className="px-4 py-2 flex items-center">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                        onClick={() => handleDelete(index)} // Pass the index to the function
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
          <br />
          <div className="flex justify-center">
            <button
              className="bg-cyan-950 hover:bg-cyan-900 text-white font-bold py-2 px-8 rounded"
              onClick={handleConfirmAvailableSlots}
            >
              Confirm Your Available Slots
            </button>
          </div>
        </div>
      </div>

      <div className="w-auto  h-auto p-10">
        <div className="flex justify-between items-center text-center">
          <h2 className="text-xl font-bold text-gray-800  p-10">
            Already Scheduled Slots
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {alreadyScheduledSlotes.map((slot) => (
            <div
              key={slot._id}
              className="bg-cyan-50 shadow-md rounded-lg p-6 pt-9 relative"
            >
              <div className="  flex justify-end ">
                <div className="text-center">
                  <Button variant="outlined" color="error">
                    <button onClick={handleDeleteForScheduledSlot}>
                      Delete
                    </button>
                  </Button>
                </div>
              </div>
              <p className="text-black mb-2">
                Start Date:{" "}
                <strong className="text-red-900 text-xl">
                  {moment(slot.startDate).format("MMM D, YYYY")}
                </strong>
              </p>
              <p className="text-black mb-2">
                End Date:
                <strong className="text-red-900 text-xl">
                  {" "}
                  {moment(slot.endDate).format("MMM D, YYYY")}
                </strong>
              </p>
              <div className="mt-4">
                <p className="text-gray-600 font-semibold">Slot Times:</p>
                <ul className="list-disc list-inside">
                  {slot.slotTime.map((time: string, index: number) => (
                    <li key={index} className="text-gray-600">
                      {time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorCalendar;
