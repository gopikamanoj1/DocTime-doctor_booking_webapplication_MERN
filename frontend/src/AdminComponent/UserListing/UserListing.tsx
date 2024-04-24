import { useEffect, useState } from "react";
import Search from "./Search"; 
import { User } from "../../Interfaces/User/UserInterface";
import axiosInstance from "../../AxiosConfig/axiosInstance";


const UserListing = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<"all" | "blocked" | "unblocked">("all"); // State for the filter

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/auth/getAllUsers"
        );
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
          setFilteredUsers(response.data.data);
        } else {
          console.error("Invalid user data:", response.data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredUsers(filtered); // Update the filtered list based on search query
  };

  const handleUserBlock = async (userId: any) => {
    try {
      console.log(userId, "userId");
      const response = await axiosInstance
        .put(`/api/auth/handleUserBlock/${userId}`);
      const updatedUser = response.data.data;

      setFilteredUsers(
        users.map((user) => (user._id === updatedUser._id ? updatedUser : user))
      );
    } catch (error) {
      console.error("Error toggling block status:", error);
    }
  };
  
  useEffect(() => {
    applyFilter(users, filter);
  }, [filter, users]); // Reapply filter when filter changes or users are updated

  const applyFilter = (
    allUsers: User[],
    filterType: "all" | "blocked" | "unblocked"
  ) => {
    if (filterType === "all") {
      setFilteredUsers(allUsers);
    } else {
      const filtered = allUsers.filter(
        (user) => user.isBlocked === (filterType === "blocked")
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <div className="pl-64 flex justify-center items-center">
      <div className="w-full max-w-4xl">
        <div className="text-center my-4">
          <h1 className="text-2xl font-bold">Patient List</h1>{" "}
        </div>

        <div className="flex justify-between mb-4">
          {/* Search bar on the left */}
          <div className="flex">
            <Search onSearch={handleSearch} />
          </div>

          {/* Filter buttons on the right */}
          <div className="flex items-center">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 mr-2 rounded-lg transition-all ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700"
              } hover:bg-blue-700`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("blocked")}
              className={`px-4 py-2 mr-2 rounded-lg transition-all ${
                filter === "blocked"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700"
              } hover:bg-blue-700`}
            >
              Blocked
            </button>
            <button
              onClick={() => setFilter("unblocked")}
              className={`px-4 py-2 mr-2 rounded-lg transition-all ${
                filter === "unblocked"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700"
              } hover:bg-blue-700`}
            >
              Unblocked
            </button>
          </div>
        </div>

        <div>
          <br />
        </div>

        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100 transition-all">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleUserBlock(user._id)}
                    className={`mr-2 ${
                      user.isBlocked
                        ? "bg-green-500 hover:bg-green-700"
                        : "bg-red-500 hover:bg-red-700"
                    } text-white py-1 px-3 rounded-full`}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListing;
