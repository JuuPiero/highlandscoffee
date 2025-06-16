import axios from "axios";
import React, { useState, useEffect } from "react";
import { formatDate } from "../../../Components/Common/finance";
import AddNewsForm from "../../../Components/FormTintuc/AddNewsForm";
import { useNavigate } from "react-router-dom";

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8); // Số tin tức trên mỗi trang
  const [showModalEdit, setshowModalEdit] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [showModalCreate, setshowModalCreate] = useState(false);
  const navigate = useNavigate();
  const roleuser = localStorage.getItem("role");
  useEffect(() => {
    if (roleuser === "Customer") {
      navigate("/");
    }
  }, [navigate, roleuser]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Tintuc");
      setNews(response.data);
      setFilteredNews(response.data); // Khởi tạo dữ liệu lọc ban đầu là toàn bộ dữ liệu
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/Tintuc/${id}`);
      const updatedNews = news.map((item) =>
        item.idTintuc === editingNews.idTintuc ? response.data : item
      );
      fetchData();

      setNews(updatedNews);
      setFilteredNews(updatedNews);
      showModalCreate(false);
    } catch (error) {
      console.error("Error editing news:", error);
      fetchData();
    }
  };
  // }
  // Xử lý thay đổi giá trị tìm kiếm và các tiêu chí lọc khác
  //   useEffect(() => {
  //     // const filteredData = news.filter(
  //     //   (item) => item.name.to().includes(searchTerm.toLowerCase())
  //       // Thêm các tiêu chí lọc khác ở đây nếu cần
  //     );
  //     setFilteredNews(filteredData);
  //   }, [searchTerm, news]);

  // Tính toán index của tin tức đầu và cuối cùng trên từng trang
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredNews.slice(indexOfFirstPost, indexOfLastPost);

  // Chuyển đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //   // Xử lý thay đổi giá trị tìm kiếm
  //   const handleSearch = (e) => {
  //     setSearchTerm(e.target.value);
  //   };

  // Xử lý hiển thị modal form chỉnh sửa
  const handleEditClick = (item) => {
    setEditingNews(item);

    setshowModalEdit(true);
  };

  // Xử lý đóng modal
  const handleCloseModal = () => {
    setshowModalEdit(false);
    setEditingNews(null);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    console.log(editingNews.idTintuc);
    try {
      // Gửi request axios để chỉnh sửa tin tức
      const response = await axios.put(
        `http://localhost:3000/Tintuc/${editingNews.idTintuc}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Edit news response:", response.data);
      // Cập nhật lại danh sách tin tức sau khi chỉnh sửa
      const updatedNews = news.map((item) =>
        item.idTintuc === editingNews.idTintuc ? response.data : item
      );
      setNews(updatedNews);
      setFilteredNews(updatedNews);

      setshowModalEdit(false);
      setEditingNews(null);
      fetchData();
    } catch (error) {
      console.error("Error editing news:", error);
    }
  };
  const openAddNews = () => {
    setshowModalCreate(true);
  };
  const closeAddNews = () => {
    setshowModalCreate(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/*  tìm kiếm */}
      <div className="mb-4">
        {/* <input
          type="text"
          placeholder="Tìm kiếm..."
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
          value={searchTerm}
          onChange={handleSearch}
        /> */}
      </div>

      <div className="overflow-x-auto">
        <button
          className="py-2.5 px-4 bg-green-300 my-3 rounded-md"
          onClick={() => openAddNews()}
        >
          Thêm mới
        </button>
        <table className="min-w-full bg-white border-gray-300 border rounded-md">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300" key={`Head`}>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Tên tin tức
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Hình ảnh
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Ngày
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Giờ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentPosts.map((item) => (
              <tr key={item.idTintuc}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.idTintuc}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  <img
                    src={`http://localhost:3000/assets/${item.hinhanh}`}
                    alt={item.name}
                    className="h-12  object-cover "
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(item.day)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.hour}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex flex-col gap-1">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                    onClick={() => handleEditClick(item)}
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(item.idTintuc)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(filteredNews.length / postsPerPage) },
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
      {showModalEdit && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md w-full md:w-4/5 lg:w-3/4 xl:w-2/3">
            <h2 className="text-lg font-medium mb-4">Chỉnh sửa tin tức</h2>
            <form onSubmit={handleSubmitEdit}>
              <div className="mb-4">
                <label
                  htmlFor="editName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tên tin tức
                </label>
                <input
                  type="text"
                  id="editName"
                  name="name"
                  defaultValue={editingNews ? editingNews.name : ""}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="editDay"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ngày
                </label>
                <input
                  type="date"
                  id="editDay"
                  name="day"
                  defaultValue={editingNews ? editingNews.day : ""}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="editHour"
                  className="block text-sm font-medium text-gray-700"
                >
                  Giờ
                </label>
                <input
                  type="time"
                  id="editHour"
                  name="hour"
                  defaultValue={editingNews ? editingNews.hour : ""}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="editImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ảnh
                </label>
                <input
                  type="file"
                  id="editImage"
                  name="hinhanh"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                  accept="image/*"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
                >
                  Lưu chỉnh sửa
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                  onClick={handleCloseModal}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showModalCreate && (
        <AddNewsForm
          setNews={setNews}
          setFilteredNews={setFilteredNews}
          onUpdate={() => {
            closeAddNews();
            fetchData();
          }}
        />
      )}
    </div>
  );
}
