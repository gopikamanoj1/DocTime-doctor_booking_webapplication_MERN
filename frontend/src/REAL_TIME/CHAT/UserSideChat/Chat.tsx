// // Chat.js (parent component)
// import React, { useState } from "react";
// import ChatBox from "./ChatBox";
// import QuickChat from "./QuickChat";
// import { useNavigate } from "react-router-dom";

// function Chat() {
//   const [selectedDoctor, setSelectedDoctor] = useState<any>(null); // State variable to store the selected doctor
// const navigate=useNavigate()
//   const handleDoctorSelection = (conversationId: any) => {
//     navigate(`/showChatPage/${conversationId}`)

//   };

//   return (
//     <div>
//       <div className="flex h-screen antialiased text-gray-800">
//         <div className="flex flex-row h-full w-full overflow-x-hidden">
//           <QuickChat onDoctorSelect={handleDoctorSelection} />x
//           <ChatBox selectedDoctor={selectedDoctor} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Chat;

import React, { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import QuickChat from "./QuickChat";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useSocket } from "../../Socket";
import { Socket } from "socket.io-client";
import Footer from "../../../components/Footer/Footer";

function Chat() {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null); // State variable to store the selected doctor
  const socket: Socket<any> | null = useSocket();

  const navigate = useNavigate();

  const handleDoctorSelection = (data: {
    conversationId: any;
    doctor: any;
  }) => {
    //  console.log(data.doctor,"this is data");

    setSelectedDoctor(data.doctor); // Set the selected doctor in the state
    navigate(`/showChatPage/${data.conversationId}`);
  };

  return (
    <div className="">
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <QuickChat onDoctorSelect={handleDoctorSelection} socket={socket} />
          <ChatBox selectedDoctor={selectedDoctor} socket={socket} />{" "}
      
          
        </div>
      </div>
      <Footer/>
    </div>
    
  );
}

export default Chat;
