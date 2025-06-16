import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminTypes = () => {
  const [types, setTypes] = useState([]);
  const [newType, setNewType] = useState("");
  const [editType, setEditType] = useState(null);
  const [Filter,setFilter] = useState("");
  const navigate = useNavigate();
  const roleuser = localStorage.getItem("role");
  useEffect(() => {
    if (roleuser === "Customer") {
      navigate("/");
    }
  }, [navigate, roleuser]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getType");
      setTypes(response.data);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  const handleAddType = async () => {
    try {
      await axios.post("http://localhost:3000/Type", { type_name: newType });
      setNewType("");
      fetchData();
    } catch (error) {
      console.error("Error adding type:", error);
    }
  };

  const handleDeleteType = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/Type/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting type:", error);
    }
  };

  const handleEditType = (type) => {
    setEditType(type);
  };

  const handleUpdateType = async () => {
    try {
      await axios.put(`http://localhost:3000/Type/${editType.idType}`, {
        type_name: editType.type_name,
      });
      setEditType(null);
      fetchData();
    } catch (error) {
      console.error("Error updating type:", error);
    }
  };

  const filteredTypes = types.filter((type) => type.type_name.toLowerCase().includes(Filter.toLowerCase()))
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Quản lý Types</h2>
      <div className="flex space-x-2 mb-3">
        <input
          type="text"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          placeholder="Enter new type"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleAddType}
        >
          Add Type
        </button>
      </div>
      <div className="flex space-x-2 mb-3">
        <input
          type="text"
          value={Filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full"
        />
       
      </div>
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Type Name
              </th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTypes.map((type) => (
              <tr key={type.idType}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {type.idType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editType && editType.idType === type.idType ? (
                    <input
                      type="text"
                      value={editType.type_name}
                      onChange={(e) =>
                        setEditType({ ...editType, type_name: e.target.value })
                      }
                      className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                  ) : (
                    type.type_name
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex space-x-2">
                  {editType && editType.idType === type.idType ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                        onClick={handleUpdateType}
                      >
                        Update
                      </button>
                      <button
                        className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                        onClick={() => setEditType(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                        onClick={() => handleEditType(type)}
                      >
                        Edit
                      </button>

                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        onClick={() => handleDeleteType(type.idType)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTypes;
