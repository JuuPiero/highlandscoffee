import React, { useState, useEffect } from "react";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get(`/users`);
    setUsers(response.data);
  };

  const deleteUser = async (id) => {
    // await axios.delete(`/users/${id}`);
    // fetchUsers();
  };

  const updateUser = (id) => {
    // Implement update logic here
  };

  return (
    <div className="container mx-auto mt-8">
      <input
        type="text"
        placeholder="Search..."
        className="mb-4 p-2 border border-gray-300 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Email</th>
            <th className="py-2">Name</th>
            <th className="py-2">Age</th>
            <th className="py-2">Gender</th>
            <th className="py-2">Birthdate</th>
            <th className="py-2">Phone</th>
            <th className="py-2">Role</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.idnguoidung}>
              <td className="py-2">{user.idnguoidung}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">{user.ten}</td>
              <td className="py-2">{user.tuoi}</td>
              <td className="py-2">{user.gioitinh}</td>
              <td className="py-2">{user.ngaysinh}</td>
              <td className="py-2">{user.sdt}</td>
              <td className="py-2">{user.role}</td>
              <td className="py-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => updateUser(user.idnguoidung)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteUser(user.idnguoidung)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
