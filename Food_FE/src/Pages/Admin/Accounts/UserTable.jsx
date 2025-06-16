import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "../../../Components/Account/UserForm";
import { formatDate } from "../../../Components/Common/finance";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingUser) {
        await axios.put(
          `http://localhost:3000/users/${editingUser.idnguoidung}`,
          formData
        );
      } else {
        await axios.post("http://localhost:3000/users", formData);
      }
      fetchUsers();
      setIsFormOpen(false);
      setEditingUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const openEditForm = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };
  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={openAddForm}
      >
        Add New User
      </button>
      {isFormOpen && (
        <UserForm
          user={editingUser}
          onSubmit={handleFormSubmit}
          closeForm={closeForm}
        />
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Age</th>
              <th className="px-4 py-2 border-b">Gender</th>
              <th className="px-4 py-2 border-b">Birthdate</th>
              <th className="px-4 py-2 border-b">Phone</th>
              <th className="px-4 py-2 border-b">Role</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.idnguoidung} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{user.idnguoidung}</td>
                <td className="px-4 py-2 border-b">{user.email}</td>
                <td className="px-4 py-2 border-b">{user.ten}</td>
                <td className="px-4 py-2 border-b">{user.tuoi}</td>
                <td className="px-4 py-2 border-b">{user.gioitinh}</td>
                <td className="px-4 py-2 border-b">
                  {formatDate(user.ngaysinh)}
                </td>
                <td className="px-4 py-2 border-b">{user.sdt}</td>
                <td className="px-4 py-2 border-b">{user.role}</td>
                <td className="px-4 py-2 border-b flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => openEditForm(user)}
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
    </div>
  );
};

export default UserTable;
