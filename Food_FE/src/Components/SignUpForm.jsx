import axios from "axios";
import React, { useState } from "react";

const SignUpForm = ({ setIsLogin }) => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  // const [registerAvatar, setRegisterAvatar] = useState(null); // Updated to hold file object

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // Basic validation example (you can expand this as needed)
    if (!registerName || !registerEmail || !registerPassword) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        ten: registerName,
        email: registerEmail,
        password: registerPassword,
        role: "Customer",
      });

      console.log("Đăng ký thành công:", response.data);
      setIsLogin(true); // Chuyển đến trang đăng nhập sau khi đăng ký thành công
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error.response.data);
      alert("Lỗi khi đăng ký:", error.response.data);
    }

    // Reset form fields after submission
    setRegisterName("");
    setRegisterEmail("");
    setRegisterPassword("");
  };

  return (
    <div className="bg-blue-400 text-black rounded-2xl shadow-2xl  flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-in">
      <h2 className="p-3 text-3xl font-bold text-white">Hello</h2>
      <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
      <h3 className="text-xl font-semibold text-white pt-2">Create Account!</h3>

      <form onSubmit={handleRegisterSubmit} className="w-full px-4">
        {/* Inputs */}
        <input
          type="text"
          className="rounded-2xl px-3 py-2 w-full border-[1px] border-blue-400 my-2 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Name"
          value={registerName}
          onChange={(e) => setRegisterName(e.target.value)}
          required
        />
        <input
          type="email"
          className="rounded-2xl px-3 py-2 w-full border-[1px] border-blue-400 my-2 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="rounded-2xl px-3 py-2 w-full border-[1px] border-blue-400 my-2 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          placeholder="Password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          required
        />
        {/* <input
          type="file" // Change input type to file
          accept=".jpg,.jpeg,.png" // Specify accepted file types if needed
          className="rounded-2xl px-3 py-2 w-full border-[1px] border-blue-400 my-2 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
          onChange={handleAvatarChange} // Handle file change event
          required
        /> */}
        <button
          type="submit"
          className="rounded-2xl mt-4 text-blue-400 bg-white w-full px-4 py-2 shadow-md hover:text-white hover:bg-blue-400 transition duration-200 ease-in"
        >
          Sign Up
        </button>
      </form>

      <p className="text-white mt-4 text-sm">Already have an account?</p>
      <p
        className="text-white mb-4 text-sm font-medium cursor-pointer"
        onClick={() => setIsLogin(true)}
      >
        Sign In to your Account?
      </p>
    </div>
  );
};

export default SignUpForm;
