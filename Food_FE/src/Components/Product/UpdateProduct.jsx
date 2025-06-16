import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UpdateProduct({ onClose, product, onUpdate }) {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [Type, setType] = useState();
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getType");
      setType(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, hinhanh: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tensp", updatedProduct.tensp);
    formData.append("soluong", updatedProduct.soluong);
    formData.append("idType", updatedProduct.idType);
    formData.append("giaban", updatedProduct.giaban);
    formData.append("motasanpham", updatedProduct.motasanpham);
    formData.append("thuonghieu", updatedProduct.thuonghieu);
    if (updatedProduct.hinhanh) {
      formData.append("hinhanh", updatedProduct.hinhanh);
    }

    try {
      await axios.put(
        `http://localhost:3000/Product/${updatedProduct.idsp}`,
        formData
      );
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
        <h2 className="text-lg font-medium mb-4">Sửa Sản phẩm</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="tensp"
            placeholder="Tên sản phẩm"
            value={updatedProduct.tensp}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="text"
            name="soluong"
            placeholder="Số lượng"
            value={updatedProduct.soluong}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <select
            name="idType"
            value={updatedProduct.idType}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {Type &&
              Type.map((item) => (
                <option key={item.idType} value={item.idType}>
                  {item.type_name}
                </option>
              ))}
          </select>
          <input
            type="text"
            name="giaban"
            placeholder="Giá bán"
            value={updatedProduct.giaban}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="text"
            name="motasanpham"
            placeholder="Mô tả sản phẩm"
            value={updatedProduct.motasanpham}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="text"
            name="thuonghieu"
            placeholder="Thương hiệu"
            value={updatedProduct.thuonghieu}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="file"
            name="hinhanh"
            onChange={handleFileChange}
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
