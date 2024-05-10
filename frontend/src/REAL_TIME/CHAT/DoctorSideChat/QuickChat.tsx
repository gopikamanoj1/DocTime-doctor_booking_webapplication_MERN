import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../../AxiosConfig/axiosInstance";
interface QuickChatProps {
  onUserSelect: (conversationId: any) => void;
  socket: any;
}
const QuickChat: React.FC<QuickChatProps> = ({ onUserSelect, socket }) => {
  const { convesationId } = useParams();
  const [users, setUsers] = useState<any[]>([]); // Changed state type to array of objects
  const [selectedUser, setSelectedUser] = useState<any>(null); // State variable to store the selected doctor
  const doctor = useSelector((state: any) => state.persisted.doctorAuth);
  const doctorId = doctor?.doctor?._id;

  const handleDoctorSelection = (user: any) => {
    setSelectedUser(user);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/auth/getDoctorConverstations?id=${doctorId}`
        );
        if (response) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [convesationId, socket]);

  return (
    <div>
      <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
        <div className="flex flex-row items-center justify-center h-12 w-full">
          <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
          </div>
          <div className="ml-2 font-bold text-2xl">QuickChat</div>
        </div>

        {/* Display list of users */}
        <div className="flex flex-col mt-8">
          <div className="flex flex-row items-center justify-between text-xs">
            <span className="font-bold">Active Conversations</span>
            <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
              {users && users?.length}
            </span>
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
            {users   && users.length > 0 &&  (
              <>
               
                {users &&
                  users.map((user, index) => (
                    <button
                      key={index}
                      className={`flex flex-row items-center hover:bg-indigo-100 rounded-xl p-2 ${
                        selectedUser === user ? "bg-indigo-300" : ""
                      }`}
                      onClick={() => {
                        onUserSelect({
                          convesationId: user.conversation._id,
                          user: user.user,
                        });
                        handleDoctorSelection(user);
                      }}
                    >
                      <div className="h-8 w-8 bg-indigo-500 rounded-full overflow-hidden">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full text-black ">
                            {user.user.name
                              ? user.user.name.charAt(0).toUpperCase()
                              : "U"}
                          </div>
                        )}
                      </div>
                      <div className="ml-2 text-sm font-semibold">
                        {user.user.name}
                      </div>
                    </button>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickChat;
