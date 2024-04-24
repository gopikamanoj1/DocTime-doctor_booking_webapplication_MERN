import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Doctor } from "../../Interfaces/Doctor/DoctorInteface";
import { Slot } from "../../Interfaces/Doctor/DoctorInteface";
import axiosInstance from "../../AxiosConfig/axiosInstance";
import { useSocket } from "../../REAL_TIME/Socket";
import { Socket } from "socket.io-client";
const ViewDoctorDetails: React.FC = () => {

  const isAuthenticated = useSelector(
    (state: any) => state.persisted.auth.isAuthenticated
  );


  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [availableSlots, setAvailableSlots] = useState<Slot[] | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [conversationId,setConversationId]=useState('')
  const User = useSelector((state: any) => state.persisted.auth);
  const socket: any  = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<Doctor>(
          `/api/auth/viewDoctorDetails/${id}`,
 
        );
        const slotsResponse = await axiosInstance.get<Slot[]>(
          `/api/auth/getAvailableSlot/${id}`,
        );

        console.log(slotsResponse.data, "Response for available slots");
        console.log(response.data, "Response in ViewDoctorDetails component");

        setDoctor(response.data.data);
        setAvailableSlots(slotsResponse.data.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
    setSelectedDate(null); // Reset selected date when a new time is selected
  };

  const handleDateSelection = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleMessege = async () => {
    try {
      const data = {
        senderId: User.user._id,
        recieverId: doctor?._id,
      };

      const response = await axiosInstance
        .post('/api/auth/createConverstation', data);
      if (response.status) {
        console.log(response, "iioioio");
        // console.log();

        toast.success("conversation Created");
        navigate(`/showChatPage/${response.data.data._id}`);
      }
    } catch (error) {}
  };
  const HandleLogin = async ()=>{
    toast.warn('Please Login')
    navigate('/login')
  }

  const bookAppointment = async () => {
    try {
      if (!selectedTime) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select a time!",
        });
        return;
      }
      if (!selectedDate) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select a date!",
        });
        return;
      }

      localStorage.setItem(
        "selectedDateTime",
        JSON.stringify({
          date: selectedDate.toLocaleDateString(),
          time: selectedTime,
        })
      );

      // Assume the user's name is available in a state variable called userName
      const data = {
        doctorEmail: doctor?.email,
        selectedTime: selectedTime,
        selectedDate: selectedDate,
      };
      console.log(data, "emaa");

      const response = await axiosInstance.post('/api/auth/bookAppointment',
        data
      );
      console.log(response, "response vvvvvvvvvvvv");

      if (response) {
        localStorage.setItem("appointmentData", JSON.stringify(response.data));
        navigate("/bookAppointment");
      }
      console.log("res:", response.data);
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };







  return (
    <div className="p-16">
      {doctor && (
        <div className="p-8 bg-slate-300 shadow ">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="  text-center order-last md:order-first mt-20 md:mt-0">
              <div className=" mt-8 bg-slate-100  rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  {doctor.kycStatus == "approved" ? (
                    <span className="text-green-500 flex items-center">
                      <FaCheckCircle className="mr-1" />
                      VERIFIED
                    </span>
                  ) : null}
                </div>
                <div className="">
                  <p className="text-gray-800  text-left">
                    <span className="font-semibold">Name:</span> Dr.{" "}
                    {doctor.name}
                  </p>
                  <p className="text-gray-800 text-left">
                    <span className="font-semibold">Fees:</span> {doctor.fees}
                  </p>
                  <p className="text-gray-800 text-left">
                    <span className="font-semibold">Specialization:</span>{" "}
                    {doctor.specialization}
                  </p>
                  <p className="text-gray-800 text-left">
                    <span className="font-semibold">Phone:</span> {doctor.phone}
                  </p>
                  <p className="text-gray-800 text-left">
                    <span className="font-semibold">Age:</span> {doctor.age}
                  </p>
                  {doctor.kycStatus === "approved" ? (
                    <>
                      <p className="text-gray-800 text-left">
                        <span className="font-semibold">Experience:</span>{" "}
                        {` ${doctor.kycDetails[0].yearsOfExperience} years of experience`}
                      </p>
                      <p className="text-gray-800 text-left">
                        <span className="font-semibold">Hospital Name:</span>{" "}
                        {doctor.kycDetails[0].hospitalName}
                      </p>
                    </>
                  ) : null}
                  <p className="text-gray-800 text-left">
                    <span className="font-semibold">Place:</span>{" "}
                    {doctor.address[0].city}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className=" text-center  pb-12">
                <h1 className="text-4xl font-medium text-gray-700">
                  {` Dr.${doctor.name}`}
                </h1>
                <p className="font-light text-gray-600 mt-3">{doctor.email}</p>
                {/* You can add more sections of doctor details here */}
              </div>
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl relative">
                <img
                  src={doctor.image}
                  alt="Doctor's Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="space-x-8 p-5 flex justify-center items-center">
                {/* <button 
                onClick={handleVideoCall}                       
                 className="text-white py-2 px-4 uppercase rounded  bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  Consultation
                </button> */}
                

                {isAuthenticated ?  <button
                  onClick={handleMessege}
                  className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  Message
                </button> :  <button
                  onClick={HandleLogin}
                  className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  Message
                </button>}

              
              </div>
              <div className="bg-transparent  p-6">
                {selectedDate && (
                  <p className="text-gray-800 mt-4">
                    {userName} Selected Date is :{" "}
                    <strong className="text-red-900">
                      {selectedDate.toLocaleDateString()}
                    </strong>{" "}
                    <p>
                      {" "}
                      Time is :{" "}
                      <strong className="text-red-900">{selectedTime}</strong>
                    </p>
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8">
      {availableSlots && availableSlots.length > 0 ? (
        availableSlots.map((slot, index) => (
          <div
            key={index}
            className="mb-2 mt-8 bg-slate-100 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-lg font-semibold mb-2">Available Slots</h2>
            <p className="text-gray-500">
              Start Date:{" "}
              <strong className="text-red-700">
                {new Date(slot.startDate).toLocaleDateString()}
              </strong>{" "}
              - End Date:{" "}
              <strong className="text-red-700">
                {new Date(slot.endDate).toLocaleDateString()}
              </strong>
            </p>

            <div>
              <h3 className="font-semibold mb-1">Slot Time:</h3>
              <ul>
                {slot.slotTime.map((time, i) => (
                  <li key={i}>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="selectedTime"
                        value={time}
                        onChange={(e) => handleTimeSelection(e.target.value)}
                        checked={selectedTime === time}
                        className="form-radio h-5 w-5 text-indigo-600"
                      />
                      <span className="ml-2 text-gray-700">{time}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {selectedTime && (
              <div className="text-left mt-4">
                {/* Assuming you're using a date picker component */}
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateSelection}
                  minDate={slot.startDate}
                  maxDate={slot.endDate}
                  inline
                />
              </div>
            )}

            <div className="text-left mt-8">
              {isAuthenticated ? (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={bookAppointment}
                >
                  Book Appointment
                </button>
              ) : (
                <button
                  className="text-red-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={HandleLogin}
                >
                  Please Login
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-64">
          <h2 className="text-xl text-gray-500 font-semibold">No available slots</h2>
        </div>
      )}
    </div>


          </div>
          <div className="mt-12 flex flex-col justify-center">
            <p className="text-gray-800 text-center font-light lg:px-16">
              {doctor && (
                <>
                  <p>
                    Hello, I'm{" "}
                    <strong className="font-medium">Dr.{doctor.name}</strong>, a
                    passionate and dedicated medical professional committed to
                    providing comprehensive healthcare to my patients. With a
                    strong educational background and years of practical
                    experience, I strive to deliver personalized and
                    compassionate medical care to individuals and families.
                  </p>
                  <p>
                    <strong className="text-cyan-950 text-xl font-medium">
                      Background and Qualifications:
                    </strong>
                    <br />
                    - I completed my medical degree at [University Name], where
                    I developed a solid foundation in medical science and
                    patient care.
                    <br />- Subsequently, I pursued specialized training in{" "}
                    <strong className=" font-medium">
                      {doctor.specialization}
                    </strong>
                    <br />- Throughout my career, I have remained dedicated to
                    staying updated with the latest advancements in medical
                    research and technology, ensuring that my patients receive
                    the highest standard of care.
                  </p>
                  <p>
                    <strong className="text-cyan-950 text-xl font-medium">
                      Philosophy of Care:
                    </strong>
                    <br />
                    - I believe in fostering strong doctor-patient relationships
                    built on trust, communication, and mutual respect. I strive
                    to create a comfortable and supportive environment where
                    patients feel empowered to participate in their healthcare
                    decisions.
                    <br />- My approach to medicine is holistic, addressing not
                    only the physical aspects of health but also considering the
                    emotional, social, and psychological well-being of my
                    patients.
                  </p>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDoctorDetails;
