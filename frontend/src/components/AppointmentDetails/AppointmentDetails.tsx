import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../AxiosConfig/axiosInstance";
import { useSocket } from "../../REAL_TIME/Socket";
import { useNavigate } from "react-router-dom";

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
      <div className="flex justify-center items-center h-full w-full">
        <div className="text-center bg-red-100 text-red-700 p-6 rounded-lg shadow-lg">
          <p className="text-xl font-semibold">No Appointments</p>
          <p className="text-sm">
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentDetails;
