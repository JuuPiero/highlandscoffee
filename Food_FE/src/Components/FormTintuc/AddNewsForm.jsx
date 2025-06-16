import axios from "axios";
import React, { useState, useEffect } from "react";

const AddNewsForm = ({ setNews, setFilteredNews, onUpdate }) => {
  const [newNews, setNewNews] = useState({
    name: "",
    day: "",
    hour: "",
    hinhanh: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNews({
      ...newNews,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setNewNews({
      ...newNews,
      hinhanh: e.target.files[0],
    });
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newNews.name);
    formData.append("day", newNews.day);
    formData.append("hour", newNews.hour);
    formData.append("hinhanh", newNews.hinhanh);

    try {
      const response = await axios.post(
        "http://localhost:3000/Tintuc",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const addedNews = response.data;
      setNews((prevNews) => [...prevNews, addedNews]);
      setFilteredNews((prevNews) => [...prevNews, addedNews]);
      onUpdate();
    } catch (error) {
      console.error("Error adding news:", error);
      onUpdate();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md w-full md:w-4/5 lg:w-3/4 xl:w-2/3">
        <h2 className="text-lg font-medium mb-4">Thêm tin tức mới</h2>
        <form onSubmit={handleSubmitAdd}>
          <div className="mb-4">
            <label
              htmlFor="addName"
              className="block text-sm font-medium text-gray-700"
            >
              Tên tin tức
            </label>
            <input
              type="text"
              id="addName"
              name="name"
              value={newNews.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="addDay"
              className="block text-sm font-medium text-gray-700"
            >
              Ngày
            </label>
            <input
              type="date"
              id="addDay"
              name="day"
              value={newNews.day}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="addHour"
              className="block text-sm font-medium text-gray-700"
            >
              Giờ
            </label>
            <input
              type="time"
              id="addHour"
              name="hour"
              value={newNews.hour}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="addImage"
              className="block text-sm font-medium text-gray-700"
            >
              Ảnh
            </label>
            <input
              type="file"
              id="addImage"
              name="hinhanh"
              onChange={handleFileChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
              accept="image/*"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
            >
              Thêm tin tức
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              onClick={() => onUpdate()}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewsForm;
