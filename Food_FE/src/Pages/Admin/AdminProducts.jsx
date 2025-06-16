import axios from "axios";
import React, { useEffect, useState } from "react";
import AddProduct from "../../Components/Product/AddProduct";
import UpdateProduct from "../../Components/Product/UpdateProduct";
import { useNavigate } from "react-router-dom";

export default function AdminProducts() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Số sản phẩm trên mỗi trang
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const navigate = useNavigate();
  const roleuser = localStorage.getItem("role");
  useEffect(() => {
    if (roleuser === "Customer") {
      navigate("/");
    }
  }, [navigate, roleuser]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/getProductinadmin"
      );
      setData(response.data.products);
      console.log(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
  };

  const filteredData = data.filter(
    (product) =>
      product.tensp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeUpdate = () => {
    setIsOpenUpdate(false);
  };

  const closeCreate = () => {
    setIsOpenAdd(false);
  };

  // Tính toán index của sản phẩm đầu và cuối cùng trên từng trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const updateProduct = (product) => {
    setSelectedProduct(product);
    setIsOpenUpdate(true);
  };

  // Chuyển đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteProduct = async (idsp) => {
    try {
      await axios.delete(`http://localhost:3000/Product/${idsp}`);
      alert("Product deleted successfully");
      fetchData();
    } catch (error) {
      alert("Error deleting product");
    }
  };

  return (
    <div className="overflow-x-auto ml-3 w-full border-[.25px] border-[#cccccc] p-3">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="border border-gray-300 rounded-md px-3 py-2 w-80 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          onClick={() => setIsOpenAdd(true)}
          className="py-2.5 px-4 bg-green-300 rounded-md hover:bg-green-400 text-white"
        >
          Thêm mới
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-md">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Hình ảnh
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Tên sản phẩm
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Giá bán
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Số lượng
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Loại sản phẩm
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Thương hiệu
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Mô tả sản phẩm
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentProducts.map((product) => (
            <tr key={product.idsp}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {product.idsp}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <img
                  src={`http://localhost:3000/assets/${product.hinhanh}`}
                  alt={product.tensp}
                  className="h-10 w-10 object-cover rounded-full"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {product.tensp}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {product.giaban}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {product.soluong}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {product.type_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {product.thuonghieu}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {product.motasanpham}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button
                  onClick={() => updateProduct(product)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                >
                  Sửa
                </button>
                <button
                  className="text-red-600 hover:text-red-900 ml-2"
                  onClick={() => deleteProduct(product.idsp)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(filteredData.length / productsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-4 py-2 rounded-md focus:outline-none ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
      {isOpenAdd && <AddProduct close={() => closeCreate()} />}
      {isOpenUpdate && (
        <UpdateProduct
          product={selectedProduct}
          onClose={() => closeUpdate()}
          onUpdate={() => {
            setSelectedProduct(null);
            fetchData();
          }}
        />
      )}
    </div>
  );
}
