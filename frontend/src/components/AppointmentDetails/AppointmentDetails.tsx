import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../AxiosConfig/axiosInstance";
import { useSocket } from "../../REAL_TIME/Socket";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { toast } from "react-toastify";

Modal.setAppElement("#root"); // or your main app element's id

// Define the structure of your appointment data
interface Doctor {
  fees: number;
  name: string;
  specialization?: string;
}

interface Appointment {
  _id: string; // Should not be `null` for uniqueness
  date: string;
  time: string;
}

interface AppointmentData {
  appointment: Appointment;
  doctor: Doctor | null;
  user: any;
}

const AppointmentDetails: React.FC = () => {
  const socket: any = useSocket();
  const [appointmentDetails, setAppointmentDetails] = useState<
    AppointmentData[]
  >([]);
  const user = useSelector((state: any) => state.persisted.auth.user);
  const userId = user ? user._id : null;
  const [join, setJoin] = useState(false);
  const [joinAppointmentId, setJoinAppointmentId] = useState<string | null>(
    null
  );
  const [joinRoomId, setJoinRoomId]: [string | null, any] = useState(null);
  const [consultCallStatus, setConsultCallStatus] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prescription, setPrescription] = useState<any | null>(null); // Correct type for prescription
  const navigate = useNavigate();

  const handleJoin = (id: any) => {
    if (joinRoomId) {
      navigate(`/videoCall/${joinRoomId}/${joinAppointmentId}`);
    } else if (
      consultCallStatus.some((item: any) => item.appointmentId === id)
    ) {
      const matchingItem: any = consultCallStatus.find(
        (item: any) => item.appointmentId === id
      );
      if (matchingItem) {
        navigate(
          `/videoCall/${matchingItem.roomId}/${matchingItem.appointmentId}`
        );
      }
    }
  };

  const showPrescription = async (appoinmentId: any) => {
    console.log(appoinmentId, "hai");
    const data = {
      appoinmentId,
    };
    console.log(data, "appoooin");

    const response = await axiosInstance.post(
      "/api/auth/downloadPrescription",
      data
    );

    if (response.data && response.data.data) {
      console.log("Fetched Prescription:", response.data.data); // Log fetched data
      setPrescription(response.data.data); // Ensure data is properly set
      setIsModalOpen(true); // Open the modal after setting data
    } else if (response.data.status === false) {
      toast.error("No prescription found");
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setPrescription(null); // Clear prescription data when closing
  };
  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get(
        `/api/auth/getConsultCallStatus?userId=${userId}`
      );
      console.log(response, "KKKKKKIIIKKKIIIKKIII");

      if (response && response.data.status) {
        console.log(response.data.data, '""THEI SI SDATAAA');
        setConsultCallStatus(response.data.data);
      }
    })();
  }, [userId]);
  useEffect(() => {
    if (socket) {
      const data = {
        chatId: "",
        id: userId,
      };
      socket.emit("joinChat", data);
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("VideoCallResponce", (data: any) => {
        console.log("HEREWEEEEEEEEEEEEEEEEE");

        const { roomId, appointmentId } = data;
        setJoinRoomId(roomId);
        setJoinAppointmentId(appointmentId);
        console.log("HAIHIHIHIHIHI");

        setJoin(true);
      });
    }
  }, [socket]);
  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const response = await axiosInstance.post(
            "/api/auth/appointmentDetails",
            { userId }
          );
          if (response.data && Array.isArray(response.data.data)) {
            setAppointmentDetails(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching data in appointment details:", error);
        }
      }
    };

    fetchData();
  }, [userId]);
  const reversedAppointments = [...appointmentDetails].reverse();

  if (appointmentDetails.length === 0) {
    return (
  
      <div className="p-6 h-screen bg-gray-50 flex flex-col items-center ">
        <div className="w-full max-w-2xl text-center   bg-red-100 text-red-700 p-6 rounded-lg shadow-lg">
          <p className="text-xl font-semibold">No Appointments</p>
          <p className="text-sm p-6">
            Please schedule an appointment to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 pt-6 rounded-lg shadow-lg p-4 mx-auto w-full md:w-[80%] lg:w-[60%]">
      {" "}
      {/* Responsive container */}
      <h2 className="text-lg font-bold text-gray-800">Appointment Details</h2>
      <hr className="my-4 border-gray-300" />
      <div className="overflow-x-auto">
        {" "}
        {/* Allow horizontal scrolling on smaller screens */}
        <table className="w-full border-collapse text-center">
          {" "}
          {/* Center text for better readability */}
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Time</th>
              <th className="border px-3 py-2">Doctor</th>
              <th className="border px-3 py-2">Fees</th>

              <th className="border px-3 py-2">Specialty</th>
              <th className="border px-3 py-2">Consultation</th>
              <th className="border px-3 py-2">Prescription</th>
            </tr>
          </thead>
          <tbody>
            {reversedAppointments.map((item, index) => {
              const { appointment, doctor } = item;
              const isJoinable = joinAppointmentId === appointment._id;
              if (!doctor) {
                return (
                  <tr key={index}>
                    <td className="border px-3 py-2">N/A</td>
                    <td className="border px-3 py-2">N/A</td>
                    <td className="border px-3 py-2">
                      Doctor info not available
                    </td>
                    <td className="border px-3 py-2">N/A</td>
                    <td className="border px-3 py-2">------</td>
                  </tr>
                );
              }

              return (
                <tr key={index}>
                  <td className="border px-3 py-2">
                    {new Date(appointment.date).toLocaleDateString()}
                  </td>
                  <td className="border px-3 py-2">{appointment.time}</td>
                  <td className="border px-3 py-2">Dr.{doctor.name}</td>
                  <td className="border px-3 py-2">Rs.{doctor.fees}</td>

                  <td className="border px-3 py-2">
                    {doctor.specialization ?? "Not specified"}
                  </td>
                  {(isJoinable && join) ||
                  consultCallStatus.some(
                    (item: any) => item.appointmentId === appointment._id
                  ) ? (
                    <td
                      className="border px-3 py-2 cursor-pointer text-cyan-800"
                      onClick={() => handleJoin(appointment._id)}
                    >
                      Join
                    </td>
                  ) : (
                    <td className="border px-3 py-2">-----</td>
                  )}
                  <td
                    onClick={() => showPrescription(appointment._id)}
                    className="border px-3 text-green-700 py-2 hover:underline"
                  >
                    check your prescription
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Prescription Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
            content: {
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              border: "none",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <div className="bg-white p-6 rounded-lg shadow-xl">
            {prescription ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Prescription Details
                </h2>
                <p className="text-gray-700">
                  <span className="font-semibold">Doctor:</span>{" "}
                  {prescription.doctor.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Appointment ID:</span>{" "}
                  {prescription.prescription.appointmentId}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Prescription Date:</span>{" "}
                  {new Date(
                    prescription.prescription.prescriptionDate
                  ).toDateString()}
                </p>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Medicines:
                  </h3>
                  <ul className="list-disc pl-5">
                    {prescription.prescription.medicines?.map(
                      (medicine: any, index: any) => (
                        <li key={index} className="text-gray-500">
                          <span className="font-semibold">
                            Name:
                            <span className="text-red-700">
                              {medicine.name}
                            </span>{" "}
                            - Dosage:{" "}
                            <span className="text-red-700">
                              {medicine.dosage}{" "}
                            </span>
                            -Instructions :{" "}
                            <span className="text-red-700">
                              {medicine.instructions}
                            </span>{" "}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <button
                  onClick={closeModal}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ease-in-out duration-300"
                >
                  Close
                </button>
              </div>
            ) : (
              <p className="text-gray-700">Loading...</p>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AppointmentDetails;
