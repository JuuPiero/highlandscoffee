import React, { useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext.js"

const Navbar = () => {
  
  const cart = useCart();
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [Name, setName] = useState(localStorage.getItem("Name") || null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setToken(null); // assuming setToken is a function passed as prop
    navigate("/");
  };
  const solongsanpham = cart.cart.reduce((total, item) => total + item.quantity, 0);


  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    setToken(tokenFromLocalStorage);
  }, []);

  const handleProfileDropdownToggle = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowDropdown(false);
  };
  const handleDropdownToggle = () => {
    if (!token) {
      alert("Ban can dang nhap");
      return;
    }
    setShowDropdown(!showDropdown);
    setShowProfileDropdown(false);
  };
  return (
    <nav className="bg-[#b22830] border-t-[10px] border-[#53382c] pt-14px pb-3 relative top-0 shadow-md ">
      <div className="container mx-auto flex items-end justify-center">
        <NavLink className="flex items-center justify-center pt-2.5" to="/">
          <div className="max-w-[110px] mr-5">
            <img src="./highlandWhiteLogo.png" alt="" className="w-full" /> 
          </div>
        </NavLink>
        <button
          className="block lg:hidden mx-2"
          type="button"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="hidden lg:flex lg:items-center lg:justify-between w-full text-lg">
          <ul className="flex flex-col lg:flex-row lg:space-x-4 text-center my-2 lg:my-0 lg:m-auto  font-bold ">
            <li className="nav-item p-2.5 hover:bg-[#53382c]  text-white">
              <NavLink className="nav-link" to="/">
                Trang chủ
              </NavLink>
            </li>
            <li className="nav-item p-2.5 hover:bg-[#53382c]  text-white">
              <NavLink className="nav-link" to="/list-products">
                Thực đơn
              </NavLink>
            </li>
            <li className="nav-item p-2.5 hover:bg-[#53382c]  text-white">
              <NavLink className="nav-link" to="/news">
                Tin tức
              </NavLink>
            </li>
            <li className="nav-item p-2.5 hover:bg-[#53382c]  text-white">
              <NavLink className="nav-link" to="/about">
                Về chúng tôi
              </NavLink>
            </li>
            
          </ul>
          <div className="flex flex-col lg:flex-row items-center lg:space-x-4 text-center">
            {!token ? (
              <>
                {" "}
                <NavLink
                  to="/login"
                  className="btn text-white hover:border-[#CC9554] btn-outline-dark m-2 border-2 border-white px-4 py-2 rounded-md hover:bg-[#CC9554] hover:text-white transition duration-300"
                >
                  <i className="fa fa-sign-in-alt mr-1"></i> Đăng nhập
                </NavLink>
              </>
            ) : (
              <div className="relative">
                {/* Dropdown toggle for Profile */}
                <button
                  onClick={handleProfileDropdownToggle}
                  className="btn text-white hover:border-[#CC9554] btn-outline-dark m-2 border-2 border-white px-4 py-2 rounded-md hover:bg-[#CC9554] hover:text-white transition duration-300 relative"
                >
                  {Name} <i className="fas fa-chevron-down ml-1"></i>
                </button>
                {/* Dropdown content for Profile */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-10">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                    >
                      Thông tin cá nhân
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="btn text-white hover:border-[#CC9554] btn-outline-dark m-2 border-2 border-white px-4 py-2 rounded-md hover:bg-[#CC9554] hover:text-white transition duration-300 relative"
              >
                <i className="fa fa-cart-shopping mr-1"></i> Giỏ hàng {`(${solongsanpham})`}
              </button>
              {/* Dropdown content */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-10">
                  <NavLink
                    to="/cart"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  >
                    Giỏ hàng 
                  </NavLink>
                  <NavLink
                    to="/orders"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  >
                    Đơn mua
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
