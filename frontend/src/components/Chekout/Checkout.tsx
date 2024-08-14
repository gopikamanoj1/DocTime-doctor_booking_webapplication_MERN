// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { loadStripe } from "@stripe/stripe-js";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import axiosInstance from "../../AxiosConfig/axiosInstance";

// const Checkout: React.FC = () => {

//   const [checkoutData, setCheckoutData] = useState<any>(null);
//   const [appointmentName, setAppointmentName] = useState<string>("");
//   const [age, setAge] = useState<string>("");
//   const [showPaymentOptions, setShowPaymentOptions] = useState<boolean>(false);
//   const [selectedDateTime, setSelectedDateTime] = useState(null);
//   const User = useSelector((state: any) => state.persisted.auth);
//   // console.log(User,"hy");
  
//   const storedData:any = localStorage.getItem("appointmentData");
//   const parsedData = JSON.parse(storedData);
  
//   const storedDateTime:any = localStorage.getItem("selectedDateTime");
//   const parsedDateTime = JSON.parse(storedDateTime);



//   const data={
//     userId: User.user._id,
//     doctorId:parsedData.data.doctor._id,
//     date:parsedDateTime.date,
//     time:parsedDateTime.time
//   }

//   useEffect(() => {
//     const storedData = localStorage.getItem("selectedDateTime");
//     if (storedData) {
//       setSelectedDateTime(JSON.parse(storedData));
//     }
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const localStorageData = localStorage.getItem("appointmentData");

//         if (localStorageData) {
//           const data = JSON.parse(localStorageData);
//           setCheckoutData(data);
//         }
//       } catch (error) {
//         console.error("Error fetching checkout data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleAppointmentNameChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setAppointmentName(e.target.value);
//   };

//   const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setAge(e.target.value);
//   };

//   const handleStripe = async () => {
//     try {
//       toast.success("Payment initiated");
//       const stripe = await loadStripe(
//         "pk_test_51P181XSHTQQP3YX0qUawabrp0Dj0K7p37YZMZl7qDlo3KAmUCp40SMFg7GbZIQgLZ6IBzrpCF2uQak2dXTZmBihV004Y8iyPq5"
//       );

//       const response = await axiosInstance.post('/api/auth/create-payment-intent',
//         { fees: checkoutData.data.doctor.fees }
//       );
//       const result = stripe?.redirectToCheckout({
//         sessionId: response.data.id,
//       });

//       if (result) {
//         try {
//           const response = await axiosInstance.post('/api/auth/loadSuccess',data
//           );
//             if(response){
//               localStorage.removeItem("selectedDateTime");

//             }

//         } catch (error) {}

//       }
//       console.log(response);
//     } catch (error) {
//       console.log(error, "error in handle stripe");
//     }
//   };

//   const handlePaymentButtonClick = () => {
//     if (!appointmentName || !age) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Please enter your appointment name and age!",
//       });
//     } else {
//       setShowPaymentOptions(true);
//     }
//   };

//   return (
//     <div className="p-8 bg-slate-200 shadow-md rounded-lg flex justify-center items-center w-full ">
//       {checkoutData && (
//         <div className="flex flex-col md:flex-row gap-4">
//           <div style={{ width: "250px" }} className="">
//             <img src={checkoutData.data.doctor.image} alt="" />
//           </div>

//           <div className="flex flex-col gap-4">
//             <div className="bg-slate-300 p-4 rounded-md">
//               <h3 className="text-lg font-semibold mb-2">
//                 Appointment Details:
//               </h3>
//               <p>
//                 <strong>Doctor Name:</strong>{" "}
//                 {`Dr.${checkoutData.data.doctor.name}`}
//               </p>
//               <p>
//                 <strong>Specialization:</strong>{" "}
//                 {checkoutData.data.doctor.specialization}
//               </p>
//               <p>
//                 <strong>Fees:</strong> {checkoutData.data.doctor.fees}
//               </p>

//               <div className="bg-white shadow-md rounded-lg p-6">
//                 {selectedDateTime && (
//                   <>
//                     <p>
//                       <strong>Date:</strong> {selectedDateTime.date}
//                     </p>
//                     <p>
//                       <strong>Time:</strong> {selectedDateTime.time}
//                     </p>
//                   </>
//                 )}
//               </div>
//             </div>

//             <div className="bg-slate-300 p-4 rounded-md">
//               <h3 className="text-lg font-semibold mb-2">Appointment For:</h3>
//               <div className="mb-4">
//                 <label
//                   htmlFor="appointmentName"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Appointment Name:
//                 </label>
//                 <input
//                   type="text"
//                   id="appointmentName"
//                   className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
//                   value={appointmentName}
//                   onChange={handleAppointmentNameChange}
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="age"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Age:
//                 </label>
//                 <input
//                   type="text"
//                   id="contactNumber"
//                   className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
//                   value={age}
//                   onChange={handleAgeChange}
//                 />
//               </div>
//             </div>

//             <div className=" p-4 rounded-md">
//               <button
//                 className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-600"
//                 onClick={handlePaymentButtonClick}
//               >
//                 Select Payment Method
//               </button>
//               {showPaymentOptions && (
//                 <div className="mt-4">
//                   {/* <button className="bg-cyan-950 px-4 py-2 rounded-md shadow-md mt-4">
//                     <p className="text-white">Wallet</p>
//                   </button> */}
//                   <button
//                     onClick={handleStripe}
//                     className="bg-cyan-950 px-4 py-2 rounded-md shadow-md mt-4 ml-2"
//                   >
//                     <p className="text-white">Stripe Online Payment</p>
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Checkout;



import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../../AxiosConfig/axiosInstance";

const Checkout: React.FC = () => {
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [appointmentName, setAppointmentName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [showPaymentOptions, setShowPaymentOptions] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const User = useSelector((state: any) => state.persisted.auth);

  useEffect(() => {
    const storedDate = localStorage.getItem("selectedDate");
    const storedTime = localStorage.getItem("selectedTime");

    if (storedDate) {
      setSelectedDate(new Date(storedDate).toLocaleDateString());
    }

    if (storedTime) {
      setSelectedTime(storedTime);
    }
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const localStorageData = localStorage.getItem("appointmentData");
        if (localStorageData) {
          const data = JSON.parse(localStorageData);
          setCheckoutData(data);
        }
      } catch (error) {
        console.error("Error fetching checkout data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAppointmentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppointmentName(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  const handleStripe = async () => {
    if (!checkoutData) return;

    const data = {
      userId: User.user._id,
      doctorId: checkoutData.data.doctor._id,
      date: selectedDate,
      time: selectedTime
    };

    try {
      toast.success("Payment initiated");
      const stripe = await loadStripe("pk_test_51P181XSHTQQP3YX0qUawabrp0Dj0K7p37YZMZl7qDlo3KAmUCp40SMFg7GbZIQgLZ6IBzrpCF2uQak2dXTZmBihV004Y8iyPq5");

      const response = await axiosInstance.post('/api/auth/create-payment-intent', {
        fees: checkoutData.data.doctor.fees
      });

      const result = stripe?.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (result) {
        try {
          const response = await axiosInstance.post('/api/auth/loadSuccess', data);
          if (response) {
            localStorage.removeItem("selectedDateTime");
          }
        } catch (error) {
          console.error("Error in loadSuccess:", error);
        }
      }
      console.log(response);
    } catch (error) {
      console.log("error in handle stripe", error);
    }
  };

  const handlePaymentButtonClick = () => {
    if (!appointmentName || !age) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your appointment name and age!",
      });
    } else {
      setShowPaymentOptions(true);
    }
  };

  return (
    <div className="p-8 bg-slate-200 shadow-md rounded-lg flex justify-center items-center w-full ">
      {checkoutData && (
        <div className="flex flex-col md:flex-row gap-4">
          <div style={{ width: "250px" }} className="">
            <img src={checkoutData.data.doctor.image} alt="" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-slate-300 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">
                Appointment Details:
              </h3>
              <p>
                <strong>Doctor Name:</strong> {`Dr.${checkoutData.data.doctor.name}`}
              </p>
              <p>
                <strong>Specialization:</strong> {checkoutData.data.doctor.specialization}
              </p>
              <p>
                <strong>Fees:</strong> {checkoutData.data.doctor.fees}
              </p>

              <div className="bg-white shadow-md rounded-lg p-6">
                {selectedDate && selectedTime && (
                  <>
                    <p>
                      <strong>Date:</strong> {selectedDate}
                    </p>
                    <p>
                      <strong>Time:</strong> {selectedTime}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="bg-slate-300 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Appointment For:</h3>
              <div className="mb-4">
                <label
                  htmlFor="appointmentName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Appointment Name:
                </label>
                <input
                  type="text"
                  id="appointmentName"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  value={appointmentName}
                  onChange={handleAppointmentNameChange}
                />
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age:
                </label>
                <input
                  type="text"
                  id="age"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  value={age}
                  onChange={handleAgeChange}
                />
              </div>
            </div>

            <div className=" p-4 rounded-md">
              <button
                className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-600"
                onClick={handlePaymentButtonClick}
              >
                Select Payment Method
              </button>
              {showPaymentOptions && (
                <div className="mt-4">
                  <button
                    onClick={handleStripe}
                    className="bg-cyan-950 px-4 py-2 rounded-md shadow-md mt-4 ml-2"
                  >
                    <p className="text-white">Stripe Online Payment</p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
