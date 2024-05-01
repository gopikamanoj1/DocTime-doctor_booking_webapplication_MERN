// ChatBox.tsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../AxiosConfig/axiosInstance";
import { format } from "date-fns"; // To format the timestamp

interface ChatBoxProps {
  selectedDoctor: any;
  socket: any;
}

const ChatBox: React.FC<ChatBoxProps> = ({ selectedDoctor, socket }) => {
  const { convesationId } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const User = useSelector((state: any) => state.persisted.auth);
  const userId = User?.user?._id;
  const messageRef = useRef<any>(null);
  const formatTime = (timestamp: any) => {
    return format(new Date(timestamp), "hh:mm a"); // 12-hour format with AM/PM
  };

  useEffect(() => {
    (async () => {
      const response = await axiosInstance
        .get(
          `/api/auth/getConverstationById?id=${convesationId}`
        );
      // console.log(response,"this is res");

      if (response.data.status) {
        setMessages(response.data.data);
      } else {
        toast.error(response.data.data);
      }
    })();
  }, [convesationId, userId]);

  useEffect(() => {
    if (socket) {
      if (User?.user?._id !== undefined) {
        socket?.emit("joinChat", { id: userId, chatId: convesationId });
      }
    }
  }, [convesationId, socket]);

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    if (socket) {
      socket.on("getMessage", (data: any) => {
        if (data.converstationId === convesationId) {
          setMessages((prevMessages: any) => {
            const setNewMessage = [...prevMessages, data];
            return setNewMessage;
          });
        }
      });
    }
  }, [socket]);

  const sendMessage = async () => {
    const data = {
      converstationId: convesationId,
      content: messageInput,
      recieverId: selectedDoctor._id,
      senderId: User.user._id,
      type: "text",
    };
    const currentTime = new Date(); // Get the current timestamp


    socket?.emit("sendMessage", {
      senderId: User.user._id,
      recieverId: selectedDoctor._id,
      content: messageInput,
      type: "text",
      converstationId: convesationId,
      timestamp: currentTime, // Include the current timestamp

    });
    setMessageInput("");
  };

  return (
    <div className=" w-full h-5/6 p-6">
      <div className="flex flex-col flex-auto  flex-shrink-0 rounded-2xl bg-blue-200 h-full p-4">
        {/* Display selected doctor */}
        <div className="flex items-center justify-start w-full  ">
          {selectedDoctor && (
            <>
              <div className="h-8 w-8 bg-indigo-200 rounded-full ml-5 overflow-hidden">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="ml-2 flex flex-col">
                <div className="text-sm font-semibold">
                  {selectedDoctor.name}
                </div>
                <div className="text-xs text-gray-500">
                  {/* <p>Last seen:</p> */}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`col-start-1 col-span-12 md:col-span-8 p-3 rounded-lg ${
                  msg.senderId === userId ? "self-end" : "self-start"
                }`}
              >
                <div className="flex flex-row items-center">
                 
                  <div className="relative ml-3  text-white text-base bg-cyan-950 py-2 px-4 shadow rounded-xl">
                    <div>{msg.content}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {formatTime(msg.timestamp)}{" "}
                      {/* Only the time is displayed */}
                    </div>
                    <div ref={messageRef}></div>
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
