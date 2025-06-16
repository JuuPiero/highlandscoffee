import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AddShipping({ close }) {
  const [shipping, setShipping] = useState({
    city: "",
    price: 0
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/addShipping", shipping);
      close()
      alert("shipping added successfully")
    } catch (error) {
      console.log("Error adding shipping")
      close();
    }
  };
  const closeform = () => {
    close();
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md w-full md:w-4/5 lg:w-3/4 xl:w-2/3">
        <h2 className="text-lg font-medium mb-4">Thêm giá ship</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
              type="text"
              name="city"
              placeholder="Thành phố"
              value={shipping.city}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
        
          <input
            type="number"
            name="price"
            placeholder="Giá ship"
            value={shipping.price}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Thêm shipping
          </button>{" "}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={close}
          >
            Huỷ
          </button>
        </form>
      </div>
    </div>
  );
}
