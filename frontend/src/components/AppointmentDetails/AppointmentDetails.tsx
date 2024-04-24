import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../AxiosConfig/axiosInstance";
import { useSocket } from "../../REAL_TIME/Socket";
import { useNavigate } from "react-router-dom";
// Define a type for the structure of your appointment
interface Doctor {
  name: string;
  specialization?: string;
}

interface Appointment {
  _id: null;
  date: string; // or `Date`, depending on your data type
  time: string;
}

interface AppointmentData {
  appointment: Appointment;
  doctor: Doctor | null; // Doctor might be missing
  user: any; // Change to a more specific type if possible
}

const AppointmentDetails: React.FC = () => {

 const socket:any = useSocket()

  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentData[]>([]);
  const user = useSelector((state: any) => state.persisted.auth.user);
  const userId = user ? user._id : null;
  const [join,setJoin]=useState(false)
  const [joinAppointmentId, setJoinAppointmentId] = useState(null);
 const [joinRoomId,setJoinRoomId]:any=useState(null)
 

const navigate=useNavigate()




  const handleJoin=()=>{
    if(joinRoomId){
      navigate(`/videoCall/${joinRoomId}`)
    }
    
  }

  useEffect(()=>{
    if(socket){
const data={
  chatId:"",
   id:userId
}
socket.emit("joinChat",data)
socket.on("VideoCallResponce",(data:any)=>{
  console.log('HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
  
const {roomId,appointmentId}=data
setJoinRoomId(roomId)
setJoinAppointmentId(appointmentId);
setJoin(true)
console.log(join,'============================hi');

      })
    }
  },[socket])


  useEffect(()=>{
console.log(join,'000000008');

  },[join])
  useEffect(() => {
    const fetchData = async () => {
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
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  if (appointmentDetails.length === 0) {
    return <div className="flex justify-center mt-0 items-center p-10 h-full w-full">
    <div className="text-center bg-red-100 text-red-700 p-10 rounded-lg shadow-lg">
      <p className="text-xl font-semibold">No Appointments</p>
      <p className="text-sm">Please schedule an appointment to get started.</p>
    </div>
  </div>
  }

  return (
    <div className="bg-slate-100 pt-9 rounded-lg shadow-lg p-6 w-[800px] mx-auto">
      <h2 className="text-xl font-bold text-gray-800">Appointment Details</h2>
      <hr className="my-4 border-gray-300" />

      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Time</th>
            <th className="border px-4 py-2">Doctor</th>
            <th className="border px-4 py-2">Specialty</th>
            <th className="border px-4 py-2">Consultation</th>

          </tr>

        </thead>
        <tbody>
          {appointmentDetails.map((item, index) => {
            
            const { appointment, doctor } = item;
            const isJoinable = joinAppointmentId === appointment._id;
            if (!doctor) {
              return (
                <tr key={index}>
                  <td className="border px-4 py-2">N/A</td>
                  <td className="border px-4 py-2">N/A</td>
                  <td className="border px-4 py-2">Doctor info not available</td>
                  <td className="border px-4 py-2">N/A</td>
                  <td className="border px-4 py-2"> ------</td>
                 
                </tr>
              );
            }

            return (
              <tr key={index}>
                <td className="border px-4 py-2">
                  {new Date(appointment.date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">{appointment.time}</td>
                <td className="border px-4 py-2">{doctor.name}</td>
                <td className="border px-4 py-2">{doctor.specialization ?? "Not specified"}</td>
                { isJoinable && join ? ( <td className="border px-4 py-2 " onClick={handleJoin} > Join</td>) :( <td className="border px-4 py-2"> -----</td>)}

              </tr>

            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentDetails;
