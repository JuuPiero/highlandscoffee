import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDateTimeLocal } from "../../utils/utils";

export default function UpdateVoucher({ onClose, voucher, onUpdate }) {
    
  const [updatedVoucher, setUpdatedVoucher] = useState(voucher);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVoucher({ ...updatedVoucher, [name]: value });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("name", updatedVoucher.name);
    // formData.append("code", updatedVoucher.code);
    // formData.append("usage_limit", updatedVoucher.usage_limit);
    // formData.append("value", updatedVoucher.value);
    // formData.append("description", updatedVoucher.description);
    // formData.append("expires_at", updatedVoucher.expires_at);
    // formData.append("type", updatedVoucher.type);

  
    try {
      await axios.post(`http://localhost:3000/updateVoucher/${updatedVoucher.id}`,updatedVoucher);
      onUpdate();
      onClose();
      alert("Product updated successfully");
    } catch (error) {
      //   alert("Error updating product");
      onUpdate();
      onClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md w-full md:w-4/5 lg:w-3/4 xl:w-2/3">
        <h2 className="text-lg font-medium mb-4">Sửa voucher</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="name"
                placeholder="Tên voucher"
                value={updatedVoucher.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            <input
                type="text"
                name="code"
                placeholder="Mã khuyến mại"
                value={updatedVoucher.code}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
                type="number"
                name="usage_limit"
                placeholder="Số lượng sử dụng"
                value={updatedVoucher.usage_limit}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <select
                name="type"
                value={updatedVoucher.type}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
                <option value="percent">
                    Phần trăm
                </option>
                <option value="fixed">
                    Giá trị cố định
                </option>
            </select>
            <input
                type="number"
                name="value"
                placeholder="Giá trị"
                value={updatedVoucher.value}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <textarea
                name="description"
                placeholder="Mô tả"
                value={updatedVoucher.description}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
                type="datetime-local"
                name="expires_at"
                placeholder="Hạn sử dụng"
                value={updatedVoucher.expires_at}
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
