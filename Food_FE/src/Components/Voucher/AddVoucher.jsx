import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AddVoucher({ close }) {
  const [voucher, setVoucher] = useState({
    name: "",
    code: "",
    description: "",
    type: "",
    value: "",
    expires_at: "",
    usage_limit: ""
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVoucher({ ...voucher, [name]: value });
  };


 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/addVoucher", voucher);
      close()
      alert("Voucher added successfully")
    } catch (error) {
      console.log("Error adding voucher")
      close();
    }
  };
  const closeform = () => {
    close();
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md w-full md:w-4/5 lg:w-3/4 xl:w-2/3">
        <h2 className="text-lg font-medium mb-4">Thêm voucher mới</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
              type="text"
              name="name"
              placeholder="Tên voucher"
              value={voucher.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          <input
            type="text"
            name="code"
            placeholder="Mã khuyến mại"
            value={voucher.code}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="number"
            name="usage_limit"
            placeholder="Số lượng sử dụng"
            value={voucher.usage_limit}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <select
            name="type"
            value={voucher.type}
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
            value={voucher.value}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <textarea
            name="description"
            placeholder="Mô tả"
            value={voucher.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="datetime-local"
            name="expires_at"
            placeholder="Hạn sử dụng"
            value={voucher.expires_at}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
       
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Thêm voucher
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
