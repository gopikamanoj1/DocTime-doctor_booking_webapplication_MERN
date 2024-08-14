import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Doctor, SlotData } from "../../Interfaces/Doctor/DoctorInteface";
import axiosInstance from "../../AxiosConfig/axiosInstance";
import { useSocket } from "../../REAL_TIME/Socket";
import { formatDate } from "../../utils/formatDate";
import { FaTimesCircle } from "react-icons/fa";

const ViewDoctorDetails: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.persisted.auth.isAuthenticated
  );

  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [availableSlots, setAvailableSlots] = useState<SlotData[] | null>(null);
  const [selectedTime, setSelectedTime] = useState<any>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const User = useSelector((state: any) => state.persisted.auth);
  const socket: any = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorResponse, slotsResponse] = await Promise.all([
          axiosInstance.get<Doctor>(`/api/auth/viewDoctorDetails/${id}`),
          axiosInstance.get<SlotData[]>(`/api/auth/getAvailableSlot/${id}`),
        ]);

        setDoctor(doctorResponse.data.data);
        setAvailableSlots(slotsResponse.data.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time === selectedTime ? null : time);
  };

  const handleDateSelection = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleMessage = async () => {
    try {
      const data = {
        senderId: User.user._id,
        receiverId: doctor?._id,
      };

      const response = await axiosInstance.post(
        "/api/auth/createConversation",
        data
      );
      if (response.status) {
        toast.success("Conversation Created");
        navigate(`/showChatPage/${response.data.data._id}`);
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  const handleLogin = () => {
    toast.warn("Please Login");
    navigate("/login");
  };

  const bookAppointment = async () => {
    try {
      if (!selectedTime || !selectedDate) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select a date and time!",
        });
        return;
      }

      const data = {
        doctorEmail: doctor?.email,
        selectedTime: selectedTime,
        selectedDate: selectedDate,
      };
      console.log(data, "faytyyttyty");
      

      const response = await axiosInstance.post(
        "/api/auth/bookAppointment",
        data
      );

      console.log(response,"rrrrrrrrrrrrrrrrrrr");
      
      if (response.data.status === true) {
        localStorage.setItem("appointmentData", JSON.stringify(response.data));
        navigate("/bookAppointment");
      } else {
        toast.warn(response.data.data);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-16 bg-gray-100 min-h-screen">
      {doctor && (
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-4 md:p-8 bg-gray-50">
              <div className="flex items-center justify-center mb-4">
                <div className="w-32 h-32 md:w-48 md:h-48 bg-indigo-100 rounded-full overflow-hidden">
                  <img
                    src={doctor.image}
                    alt="Doctor's Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="text-center">
                {doctor.kycStatus === "approved" && (
                  <span className="text-green-500 flex items-center justify-center mb-4">
                    <FaCheckCircle className="mr-1" />
                    VERIFIED
                  </span>
                )}
                <h2 className="text-2xl font-semibold text-gray-800">
                  Dr. {doctor.name}
                </h2>
                <p className="text-gray-600">{doctor.email}</p>
                <p className="text-gray-800 mt-2">
                  <strong>Specialization:</strong> {doctor.specialization}
                </p>
                <p className="text-gray-800 mt-1">
                  <strong>Fees:</strong> ${doctor.fees}
                </p>
                <p className="text-gray-800 mt-1">
                  <strong>Age:</strong> {doctor.age}
                </p>
                {doctor.kycStatus === "approved" && (
                  <>
                    <p className="text-gray-800 mt-1">
                      <strong>Experience:</strong>{" "}
                      {doctor.kycDetails[0].yearsOfExperience} years
                    </p>
                    <p className="text-gray-800 mt-1">
                      <strong>Hospital Name:</strong>{" "}
                      {doctor.kycDetails[0].hospitalName}
                    </p>
                  </>
                )}
                <p className="text-gray-800 mt-1">
                  <strong>Location:</strong> {doctor.address[0].city}
                </p>
              </div>
              <div className="mt-4 flex justify-center space-x-4">
                {isAuthenticated ? (
                  <button
                    onClick={handleMessage}
                    className="text-white py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 transition duration-200"
                  >
                    Message
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="text-white py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 transition duration-200"
                  >
                    Message
                  </button>
                )}
              </div>
            </div>

            <div className="w-full md:w-2/3 p-4 md:p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                  About Dr. {doctor.name}
                </h1>
                <p className="text-gray-600 mt-4">
                  Hello, I'm <strong>Dr. {doctor.name}</strong>, a passionate
                  and dedicated medical professional committed to providing
                  comprehensive healthcare to my patients. With a strong
                  educational background and years of practical experience, I
                  strive to deliver personalized and compassionate medical care
                  to individuals and families.
                </p>
                <p className="text-gray-600 mt-2">
                  <strong className="text-cyan-700 text-xl">
                    Background and Qualifications:
                  </strong>
                  <br />
                  - Completed medical degree at [University Name].
                  <br />- Specialized in{" "}
                  <strong>{doctor.specialization}</strong>.
                  <br />- Remain updated with the latest advancements in medical
                  research and technology.
                </p>
                <p className="text-gray-600 mt-2">
                  <strong className="text-cyan-700 text-xl">
                    Philosophy of Care:
                  </strong>
                  <br />
                  - Foster strong doctor-patient relationships built on trust,
                  communication, and mutual respect.
                  <br />- Holistic approach to medicine, addressing physical,
                  emotional, social, and psychological well-being.
                </p>
              </div>

              {availableSlots && availableSlots.length > 0 ? (
                availableSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 mb-4"
                  >
                    <h2 className="text-xl font-semibold mb-2">
                      Available Slots
                    </h2>
                    <p className="text-gray-600">
                      Start Date:{" "}
                      <strong className="text-red-600">
                        {formatDate(slot.startDate)}
                      </strong>{" "}
                      - End Date:{" "}
                      <strong className="text-red-600">
                        {formatDate(slot.endDate)}
                      </strong>
                    </p>

                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mb-2">
                        Select Date
                      </h3>
                      {/* Replace DatePicker with a modern date selection component */}
                      <input
                        type="date"
                        value={
                          selectedDate
                            ? selectedDate.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          handleDateSelection(new Date(e.target.value))
                        }
                        min={slot.startDate.split("T")[0]}
                        max={slot.endDate.split("T")[0]}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>

                    {selectedDate && (
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">
                          Select Time Slot
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {availableSlots && availableSlots.length > 0 ? (
                            availableSlots[0].slots.map((timeSlot: any) => (
                              <div
                                key={timeSlot._id}
                                className={`p-4 rounded-lg  shadow-sm cursor-pointer transition duration-150 ${
                                  timeSlot.booked
                                    ? "bg-red-100 text-red-500"
                                    : "bg-green-200 text-green-800"
                                } ${
                                  selectedTime === timeSlot.time &&
                                  !timeSlot.booked
                                    ? " border  border-green-800 bg-green-600 text-white"
                                    : ""
                                }`}
                                onClick={() =>
                                  !timeSlot.booked &&
                                  handleTimeSelection(timeSlot.time)
                                }
                              >
                                <div className="flex items-center space-x-2">
                                  {timeSlot.booked ? (
                                    <>
                                      <FaTimesCircle className="text-red-500" />
                                      <span className="font-medium text-sm">
                                        {timeSlot.time} - Booked
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <FaCheckCircle className="text-green-500" />
                                      <span className="font-medium text-sm">
                                        {timeSlot.time} - Available
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="col-span-2 text-center text-gray-500">
                              No available slots for the selected date
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mt-6">
                      {isAuthenticated ? (
                        <button
                          className="bg-cyan-600 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          onClick={bookAppointment}
                        >
                          Book Appointment
                        </button>
                      ) : (
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          onClick={handleLogin}
                        >
                          Please Login
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <h2 className="text-xl font-semibold text-gray-600">
                    No available slots
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDoctorDetails;
