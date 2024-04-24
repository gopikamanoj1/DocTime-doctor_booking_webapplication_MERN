import React, { useEffect, useState } from "react";
import axiosInstance from "../../AxiosConfig/axiosInstance";
import { useSelector } from "react-redux";
import { Appointment } from "../../Interfaces/Doctor/DoctorInteface";
import { useSocket } from "../../REAL_TIME/Socket";
import { useNavigate } from "react-router-dom";


interface AppointmentResponse {
  status: boolean;
  data: Appointment[];
}

const DoctorAppointmentTable = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const doctor = useSelector((state: any) => state.persisted.doctorAuth);
  const [isModalOpen, setModalOpen] = useState(false);
  const [medicines, setMedicines] = useState<{ name: string; dosage: string; instructions: string }[]>([]);
  const [doctorName, setDoctorName] = useState('');

  const [prescriptionTime, setPrescriptionTime] = useState<string>('');
 
  // State for medicines
  
  const [fees, setFees] = useState(0);
  const [prescriptionDate, setPrescriptionDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSave = () => {
    // Handle the saving logic for the prescription
    console.log('Prescription:', { medicines, doctorName, fees, prescriptionDate });
    closeModal(); // Close the modal after saving
  };
  const socket: any  = useSocket();
const navigate=useNavigate()
console.log(appointments,'-----------------');


  // Handler to open the modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Handler to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(()=>{
  
    if(socket){
      const data={
        chatId:"",
        id:doctor.doctor._id
      }
      socket.emit("joinChat",data)
    }

  },[socket])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = {
          id: doctor?.doctor._id,
        };

        const response = await axiosInstance.post<AppointmentResponse>(
          "/api/auth/getAppoinmentDetails",
          data
        );

        if (response.data.status && response.data.data.length > 0) {
          setAppointments(response.data.data);
        } else {
          setAppointments([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, [doctor]);


  function randomID(len:number) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }


const handleVideoCall = async(userId:any,appointmentId:any)=>{

  try {
    const  roomId=randomID(10)
    const data={
    userId: userId ,
    roomId,
    appointmentId:appointmentId
    }
    console.log(data,"data");
    socket.emit('VideoCall',data)

    navigate(`/videoCall/${roomId}`)


    // const response=await axiosInstance.post('/api/auth/getConvetsationIdForVideoCall',data)
    // console.log(response,"ggggggg");
    // if(response.data.status){
    //   // const chatId=response.data.data._id
    //   console.log(chatId,"bbbbbbbbbbbbbbbbbb");
      
    //   const  roomId=randomID(10)
    //   const emitData={
    //     chatId,
    //     roomId:roomId
    //   }
    //  
    // }


  } catch (error) {
    console.log(error);
    
  }




//     

//     navigate(/VideoCall/${roomId})
//   }


//   const handleJoinVidoCallRoom=()=>{

//     navigate(`/VideoCall/${}`)
//    
  }

  return (
    <div className="p-6 h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-2xl text-center">
 
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Your Appointments
        </h1>
        {appointments.length > 0 ? (
          <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        
            <thead className="bg-gray-200 w-full ">
              <tr>
                <th className="py-2 px-4 text-center text-gray-600">Date</th>
                <th className="py-2 px-4 text-center text-gray-600">Time</th>
                <th className="py-2 px-4 text-center text-gray-600">Status</th>
                <th className="py-2 px-4 text-center text-gray-600">
                  Consultation
                </th>
                <th className="py-2 px-4 text-center text-gray-600">Priscription</th>

              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="py-2 px-4">
                    {new Date(appointment.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">{appointment.time}</td>
                  <td> {appointment.status}</td>
                  <td>
                    <button
                     onClick={()=>handleVideoCall(appointment.userId,appointment._id)}                       
 
                    className="bg-emerald-800 text-white font-semibold py-2 px-4 rounded hover:bg-emerald-700 hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-0.5">
                      Consult Now
                    </button>

                  </td>

                  <td className="border px-4 py-2">
              <button
                onClick={openModal}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Prescription
              </button>

                  </td>

                </tr>
              ))}
            </tbody>
          </table>
          
        ) : (
          <p className="text-gray-600">No appointments found.</p>
        )}
      </div>


        {/* Modal Definition */}
        {isModalOpen && (
<div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${isModalOpen ? 'block' : 'hidden'}`}>
 <div className="bg-white p-6 rounded shadow-lg w-1/1 transition-transform duration-300 transform">
    <h2 className="text-xl font-bold">Add Prescription</h2>

    {/* Display Appointment Date, Time, and Doctor Name */}
    <div className="mt-4 flex flex-col">
      <div className="mb-4">
        <label className="block text-gray-700">Appointment Date</label>
        <input
          type="date"
          className="border rounded px-3 py-2 w-full"
          value={prescriptionDate}
          onChange={(e) => setPrescriptionDate(e.target.value)}
        />
      </div>
     
      <div className="mb-4">
        <label className="block text-gray-700">Doctor's Name</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        />
      </div>
      
    </div>

    {/* Medicines List with Dynamic Add Button */}
    {medicines.map((med, index) => (
      <div>
              <label className="block text-gray-700">Medicines</label>

         <div key={index} className="flex items-center mb-2">
    <input
      type="text"
      className="border rounded px-3 py-2 w-full"
      placeholder="Enter medicine name"
      value={med.name}
      onChange={(e) => {
        const newMedicines = [...medicines];
        newMedicines[index].name = e.target.value;
        setMedicines(newMedicines);
      }}
    />
    <input
      type="text"
      className="border rounded px-3 py-2 w-full ml-2"
      placeholder="Enter dosage"
      value={med.dosage}
      onChange={(e) => {
        const newMedicines = [...medicines];
        newMedicines[index].dosage = e.target.value;
        setMedicines(newMedicines);
      }}
    />
    <input
      type="text"
      className="border rounded px-3 py-2 w-full ml-2"
      placeholder="Enter instructions"
      value={med.instructions}
      onChange={(e) => {
        const newMedicines = [...medicines];
        newMedicines[index].instructions = e.target.value;
        setMedicines(newMedicines);
      }}
    />
    {index > 0 && (
      <button
        className="ml-2 text-red-600"
        onClick={() => {
          const newMedicines = medicines.filter((_, i) => i !== index);
          setMedicines(newMedicines);
        }}
      >
        Remove
      </button>
    )}
 </div>
      </div>

))}
<button
 className="bg-cyan-950 text-white px-4 py-2 rounded hover:bg-cyan-900"
 onClick={() => setMedicines([...medicines, { name: "", dosage: "", instructions: "" }])}
>
 Add More Medicines
</button>

    {/* Modal Actions */}
    <div className="mt-6 flex justify-end">
      <button
        onClick={closeModal}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Cancel
      </button>
      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-4 py-2 rounded ml-4 hover:bg-green-600"
      >
        Save
      </button>
    </div>
 </div>
</div>

 
      )}
    </div>
  );
};

export default DoctorAppointmentTable;
