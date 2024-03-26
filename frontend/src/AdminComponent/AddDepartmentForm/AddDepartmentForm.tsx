import React, { useState } from "react";

const AddDepartmentForm: React.FC = () => {
  const [departmentName, setDepartmentName] = useState<string>("");
  const [departments, setDepartments] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to backend
    console.log("Submitted:", departmentName);
    // Add new department to the list
    setDepartments([...departments, departmentName]);
    // Clear input field after submission
    setDepartmentName("");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-semibold mb-4">Add Department</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="departmentName"
          >
            Department Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="departmentName"
            type="text"
            placeholder="Enter department name"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Department
          </button>
        </div>
      </form>

      {departments.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Departments</h2>
          <table className="border-collapse border border-gray-400 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">Department Name</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, index) => (
                <tr key={index} className={(index % 2 === 0) ? "bg-gray-100" : ""}>
                  <td className="border border-gray-400 px-4 py-2">{dept}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddDepartmentForm;
