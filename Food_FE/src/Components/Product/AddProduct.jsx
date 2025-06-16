import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AddProduct({ close }) {
  const [product, setProduct] = useState({
    tensp: "",
    soluong: "",
    idType: "1",
    giaban: "",
    motasanpham: "",
    thuonghieu: "",
    hinhanh: null,
  });
  const [Type, setType] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, hinhanh: e.target.files[0] });
  };

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tensp", product.tensp);
    formData.append("soluong", product.soluong);
    formData.append("idType", product.idType);
    formData.append("giaban", product.giaban);
    formData.append("motasanpham", product.motasanpham);
    formData.append("thuonghieu", product.thuonghieu);
    formData.append("hinhanh", product.hinhanh);

    try {
      axios.post("http://localhost:3000/Product", formData);
      close();
      alert("Product added successfully");
    } catch (error) {
      console.log("Error adding product");
      close();
    }
  };
  const closeform = () => {
    close();
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md w-full md:w-4/5 lg:w-3/4 xl:w-2/3">
        <h2 className="text-lg font-medium mb-4">Thêm Sản phẩm mới</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="tensp"
            placeholder="Tên sản phẩm"
            value={product.tensp}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="number"
            name="soluong"
            placeholder="Số lượng"
            value={product.soluong}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <select
            name="idType"
            value={product.idType}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {Type &&
              Type.map((item) => (
                <option key={item.idType} value={item.idType}>
                  {item.type_name} {item.idType}
                </option>
              ))}
          </select>
          <input
            type="number"
            name="giaban"
            placeholder="Giá bán"
            value={product.giaban}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <textarea
            name="motasanpham"
            placeholder="Mô tả sản phẩm"
            value={product.motasanpham}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="text"
            name="thuonghieu"
            placeholder="Thương hiệu"
            value={product.thuonghieu}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="file"
            name="hinhanh"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Thêm sản phẩm
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
