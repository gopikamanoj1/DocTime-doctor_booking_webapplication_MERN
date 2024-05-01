import React, { useEffect, useState } from "react";
import axiosInstance from "../../AxiosConfig/axiosInstance";
import { useSelector } from "react-redux";
import { Appointment } from "../../Interfaces/Doctor/DoctorInteface";
import { useSocket } from "../../REAL_TIME/Socket";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface AppointmentResponse {
  status: boolean;
  data: Appointment[];
}

const DoctorAppointmentTable = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const doctor = useSelector((state: any) => state.persisted.doctorAuth);
  const [isModalOpen, setModalOpen] = useState(false);
  const [medicines, setMedicines] = useState<
    { name: string; dosage: string; instructions: string }[]
  >([]);
  const [doctorName, setDoctorName] = useState("");

  const [prescriptionTime, setPrescriptionTime] = useState<string>("");

  // State for medicines

  const [prescriptionDate, setPrescriptionDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [appointmentId, setAppointmentId] = useState<string>("");

  const socket: any = useSocket();
  const navigate = useNavigate();
  console.log(appointments, "-----------------");

  // Handler to open the modal
  const openModal = (appointmentId: any) => {
    setAppointmentId(appointmentId);
    setModalOpen(true);
  };

  // console.log(appointmentId,"appointmentId");

  // Handler to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (socket) {
      const data = {
        chatId: "",
        id: doctor.doctor._id,
      };
      socket.emit("joinChat", data);
    }
  }, [socket]);

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

  function randomID(len: number) {
    let result = "";
    if (result) return result;
    var chars =
        "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  const handleVideoCall = async (userId: any, appointmentId: any) => {
    try {
      const roomId = randomID(10);
      const data = {
        userId: userId,
        roomId,
        appointmentId: appointmentId,
        doctorId: doctor.doctor._id,
      };
      console.log(data, "data");
      socket.emit("VideoCall", data);

      navigate(`/videoCall/${roomId}/${appointmentId}`);

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
  };

  const handleSave = async () => {
    const data = {
      appointmentId: appointmentId,
      prescriptionDate: prescriptionDate,
      medicines: medicines,
    };

    const response = await axiosInstance.post(
      "/api/auth/addPrescription",
      data
    );
    if (response) {
      toast.info(" Prescription added successfully");
    }

    closeModal(); // Close the modal after saving
  };
  const reversedAppointments = [...appointments].reverse();

  return (
    <div className="p-6 h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Your Appointments
        </h1>
        {reversedAppointments.length > 0 ? (
          <table className="w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-200 w-full ">
              <tr>
                <th className="py-2 px-4 text-center text-gray-600">Date</th>
                <th className="py-2 px-4 text-center text-gray-600">Time</th>
                <th className="py-2 px-4 text-center text-gray-600">Status</th>
                <th className="py-2 px-4 text-center text-gray-600">
                  Consultation
                </th>
                <th className="py-2 px-4 text-center text-gray-600">
                  Priscription
                </th>
              </tr>
            </thead>
            <tbody>
              {reversedAppointments.map((appointment) => (
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
                      onClick={() =>
                        handleVideoCall(appointment.userId, appointment._id)
                      }
                      className="bg-emerald-800 text-white font-semibold py-2 px-4 rounded hover:bg-emerald-700 hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-0.5"
                    >
                      Consult Now
                    </button>
                  </td>

                  <td className="border px-4 py-2">
                    <button
                      onClick={() => openModal(appointment._id)}
                      className=" text-red-500 px-4 py-2 rounded "
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

      <div>
        {isModalOpen && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ease-in-out ${
              isModalOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl transition-transform duration-300 transform ${
                isModalOpen ? "scale-100" : "scale-95"
              }`}
            >
              <h2 className="text-2xl font-bold text-gray-900">
                Add Prescription
              </h2>

              {/* Prescription Details */}
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-cyan-950"
                    value={prescriptionDate}
                    onChange={(e) => setPrescriptionDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Doctor's Name
                  </label>
                  <input
                    type="text"
                    className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-cyan-950"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                  />
                </div>
              </div>

              {/* Medicines List */}
              <div className="mt-6 space-y-4">
                {medicines.map((med, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <input
                      type="text"
                      className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-cyan-950"
                      placeholder="Medicine Name"
                      value={med.name}
                      onChange={(e) => {
                        const newMedicines = [...medicines];
                        newMedicines[index].name = e.target.value;
                        setMedicines(newMedicines);
                      }}
                    />
                    <input
                      type="text"
                      className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-cyan-950"
                      placeholder="Dosage"
                      value={med.dosage}
                      onChange={(e) => {
                        const newMedicines = [...medicines];
                        newMedicines[index].dosage = e.target.value;
                        setMedicines(newMedicines);
                      }}
                    />
                    <input
                      type="text"
                      className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-cyan-950"
                      placeholder="Instructions"
                      value={med.instructions}
                      onChange={(e) => {
                        const newMedicines = [...medicines];
                        newMedicines[index].instructions = e.target.value;
                        setMedicines(newMedicines);
                      }}
                    />
                    {index > 0 && (
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => {
                          const newMedicines = medicines.filter(
                            (_, i) => i !== index
                          );
                          setMedicines(newMedicines);
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}

                <button
                  className="text-cyan-950 hover:text-cyan-700 font-semibold"
                  onClick={() =>
                    setMedicines([
                      ...medicines,
                      { name: "", dosage: "", instructions: "" },
                    ])
                  }
                >
                  Add More Medicines
                </button>
              </div>

              {/* Modal Actions */}
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={closeModal}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointmentTable;
