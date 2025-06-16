import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ setIsLogin }) => {
  const navigate = useNavigate(); // Sử dụng useNavigate hook để truy cập vào navigate của router
  localStorage.clear();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", loginEmail);
    console.log("Password:", loginPassword);

    postLogin(loginEmail, loginPassword);
  };

  const postLogin = (email, password) => {
    localStorage.clear();
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3000/loginAdmin", {
          email,
          password,
        });
        const { token, Name, role } = response.data;
        console.log(role);

        localStorage.setItem("token", token);
        localStorage.setItem("Name", Name);
        localStorage.setItem("role", role);
        navigate("/admin");
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
      }
    };

    fetchData();
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col items-center w-full md:w-1/3 max-w-4xl transition duration-1000 ease-out pt-5">
        <h2 className="p-3 text-3xl font-bold text-pink-400">Hello Admin</h2>
        <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
        <h3 className="text-xl font-semibold text-blue-400 pt-2">Sign In!</h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          <input
            type="email"
            className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button className="rounded-2xl m-2 text-white bg-blue-400 w-2/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in">
            Sign In
          </button>
        </form>
        <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
        <p className="text-blue-400 mt-4 text-sm pb-3">
          Đăng nhập tư cách quản trị viên
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
