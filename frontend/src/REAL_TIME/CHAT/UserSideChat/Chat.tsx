import { useState } from "react";
import ChatBox from "./ChatBox";
import QuickChat from "./QuickChat";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../Socket";
import { Socket } from "socket.io-client";
import Footer from "../../../components/Footer/Footer";

function Chat() {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const socket: Socket<any> | null = useSocket();

  const navigate = useNavigate();

  const handleDoctorSelection = (data: {
    conversationId: any;
    doctor: any;
  }) => {
    setSelectedDoctor(data.doctor);
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
      <Footer />
    </div>
  );
}

export default Chat;
