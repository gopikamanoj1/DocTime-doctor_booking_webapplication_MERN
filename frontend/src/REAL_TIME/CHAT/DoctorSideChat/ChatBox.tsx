// ChatBox.tsx
import React, { useState, useEffect } from "react";

import Loading from "../../../Loading/Loading";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

interface ChatBoxProps {
  selectedUser: any; // Define the selectedDoctor prop
  socket: any;
}


const ChatBox: React.FC<ChatBoxProps> = ({ selectedUser, socket }) => {
  const { convesationId } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const doctor = useSelector((state: any) => state.persisted.doctorAuth);
  const doctorId = doctor?.doctor?._id;
  console.log(messages, "ooooo");

  useEffect(() => {
    if (!convesationId || !doctor) return; // Add null checks

    (async () => {
      const response = await axios
        .create({ withCredentials: true })
        .get(
          `http://localhost:3000/api/auth/getConverstationById?id=${convesationId}`
        );
      console.log(response, "this is res doc");

      if (response.data.status) {
        setMessages(response.data.data);
      } else {
        toast.error(response.data.data);
      }
    })();
  }, [convesationId, doctorId]);

  useEffect(() => {
    if (socket) {
      if (doctorId !== undefined) {
        console.log(doctorId, "not undifined");

        socket?.emit("joinChat", { id: doctorId, chatId: convesationId });
      }
    }
    // }, [convesationId, socket, doctor]);
  }, [doctorId]);

  useEffect(() => {
    if (!socket) return; // Add null check

    socket.on("getMessage", (data: any) => {
      if (data.converstationId === convesationId) {
        toast.error("doctor");
        setMessages((prevMessages: any) => [...prevMessages, data]);
      }
    });
  }, [socket, convesationId]);

  useEffect(() => {
    if (!socket || !doctorId) return; // Add null checks

    socket.emit("joinChat", { id: doctorId, chatId: convesationId });
  }, [socket, doctorId, convesationId]);



  const sendMessage = async () => {
    const data = {
      converstationId: convesationId,
      content: messageInput,
      recieverId: selectedUser._id,
      senderId: doctor?.doctor._id,
      type: "text",
    };

    socket?.emit("sendMessage", {
      senderId: doctor?.doctor._id,
      recieverId: selectedUser._id,
      content: messageInput,
      type: "text",
      conversationId: convesationId,
    });
      setMessageInput("");
  };

  // useEffect(() => {
  //   if (socket) {
  //     console.log("Iam here ");

  //     socket.on("getMessage", (data: any) => {
  //       if (data.converstationId === convesationId) {
  //         toast.error("doctor");
  //         setMessages((prevMessages: any) => {
  //           const setNewMessage = [...prevMessages, data];
  //           return setNewMessage;
  //         });
  //       }
  //     });
  //   }
  // }, [socket]);

  return (
    <div className=" w-full h-5/6 p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-blue-200 h-full p-4">
        {/* Display selected doctor */}
        <div className="flex  items-center justify-start w-full  p-auto rounded-2xl">
          {selectedUser && (
            <>
              <div className="h-8 w-8 bg-indigo-200 rounded-full ml-5 overflow-hidden">
                <img
                  src={selectedUser.image}
                  alt={selectedUser.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="ml-2 flex flex-col">
                <div className="text-sm font-semibold">{selectedUser.name}</div>
                <div className="text-xs text-gray-500">
                  <p>Last seen:</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Display messages */}
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`col-start-1 col-span-12 md:col-span-8 p-3 rounded-lg ${
                  msg.senderId === doctorId
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                <div className="flex flex-row items-center">
                
                  <div className="relative ml-3  text-white text-base bg-cyan-950 py-2 px-4 shadow rounded-xl">
                    <div>{msg.content}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message input and send button */}
        <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
          <div className="flex-grow ml-4">
            <div className="relative w-full">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex w-full border bg-slate-200 border-gray-400 rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10 text-gray-700"
              />

              {/* <button
                onClick={sendMessage}
                className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button> */}
            </div>
          </div>
          <div className="ml-4">
          <button
              onClick={sendMessage}
              className="flex items-center justify-center bg-cyan-800 hover:bg-cyan-950 rounded-xl text-white px-4 py-1 flex-shrink-0"
            >
              <span>Send</span>
              <span className="ml-2">
                <svg
                  className="w-4 h-4 transform rotate-45 -mt-px"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
