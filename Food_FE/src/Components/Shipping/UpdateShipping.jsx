import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDateTimeLocal } from "../../utils/utils";

export default function UpdateShipping({ onClose, shipping, onUpdate }) {
    
  const [updatedShipping, setUpdatedShipping] = useState(shipping);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedShipping({ ...updatedShipping, [name]: value });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    try {
      await axios.post(`http://localhost:3000/updateShipping/${updatedShipping.id}`, updatedShipping);
      onUpdate();
      onClose();
      alert("Shipping updated successfully");
    } catch (error) {
      alert("Error updating Shipping");
      // onUpdate();
      onClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md w-full md:w-4/5 lg:w-3/4 xl:w-2/3">
        <h2 className="text-lg font-medium mb-4">Sửa Giá ship</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="city"
                placeholder="Tên voucher"
                value={updatedShipping.city}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
        
            <input
                type="number"
                name="price"
                placeholder="Số lượng sử dụng"
                value={updatedShipping.price}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
