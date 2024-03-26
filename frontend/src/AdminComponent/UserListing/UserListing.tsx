import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  _id: number;
  name: string;
  email: string;
  blocked: boolean; // Add blocked field
  // Add other properties as needed
}

const UserListing = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/getAllUsers');
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          console.error('Invalid user data:', response.data.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const toggleBlockStatus = async (userId: number) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/auth/toggleBlockUser/${userId}`);
      const updatedUser = response.data.data;
      setUsers(users.map(user => user._id === updatedUser._id ? updatedUser : user));
    } catch (error) {
      console.error('Error toggling block status:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold uppercase tracking-wider">
              ID
            </th>
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
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100 transition-all">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user._id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => toggleBlockStatus(user._id)}
                  className={`mr-2 ${user.blocked ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'} text-white py-1 px-3 rounded-full`}
                >
                  {user.blocked ? 'Unblock' : 'Block'}
                </button>
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListing;
