import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../../Context/CartContext";
import { formatCurrencyVND } from "../../../Components/Common/finance";
import Modal from "react-modal";

const ListProduct = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [data, setData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("type");
  const [filterType, setFilterType] = useState("");
  const [filterTitle, setFilterTitle] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [visibleCount, setVisibleCount] = useState(6);
  const [modalLogin, setModalLogin] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getProduct");
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    if (selectedFilter === "type_name") {
      return item.type_name.toLowerCase().includes(filterType.toLowerCase());
    } else if (selectedFilter === "tensp") {
      return item.tensp.toLowerCase().includes(filterTitle.toLowerCase());
    } else if (selectedFilter === "giaban") {
      return item.giaban >= minPrice && item.giaban <= maxPrice;
    }
    return true;
  });

  const onClickDetail = (product) => {
    navigate("/list-products/detail", { state: { product } });
  };

  const handleLoginRedirect = () => {
    navigate("/login");
    setModalLogin(false);
  };

  const onBuynow = (product) => {
    if (!token) {
      setModalLogin(true);
    }
    addToCart(product);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const moreInfo = () =>
    setVisibleCount((prevVisibleCount) => prevVisibleCount + 3);
  const lessInfo = () => setVisibleCount(6);
  console.log(data);
  return (
    <div className="list-product py-11">
      <div className="news-wrapper px-[15px] max-w-[1200px] mx-auto">
        <div className="w-full">
          <div className="box w-full">
            <div className="mid-title mb-5 w-auto relative">
              <h1 className="text-[45px] leading-[55px] font-bold text-left text-[#53382c]">
                SẢN PHẨM
              </h1>
            </div>
            <div className="nav-link py-3 text-blue-400 text-sm flex gap-1">
              <NavLink to="/">{""}Home</NavLink>
              <p className="text-black">\ {"List product"}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {currentItems.map((product, index) => (
                <div
                  key={index}
                  className="product-item border rounded shadow-sm"
                >
                  <div className="img-news pt-[66.666666%] relative overflow-hidden mb-2.5">
                    <div
                      onClick={() => onClickDetail(product)}
                      className="transition cursor-pointer"
                    >
                      <img
                        src={`http://localhost:3000/assets/${product.hinhanh}`}
                        alt={product.tensp}
                        className="absolute top-0 left-0 w-full h-full object-cover transition "
                      />
                    </div>
                  </div>
                  <div className="tent mb-[5px] px-3">
                    <h3 className="font-bold">
                      <a
                        href=" "
                        className="block text-sm h-44px overflow-hidden"
                      >
                        {product.tensp}
                      </a>
                    </h3>
                  </div>
                  <div className="price text-base text-[#b22830] px-3 font-bold mb-2">
                    <span>{formatCurrencyVND(product.giaban)}</span>
                  </div>
                  <div className="action flex items-center gap-2 px-3 w-full pb-4">
                    {product.soluong === 0 ? (
                      <p>Tạm thời hết hàng</p>
                    ) : (
                      <>
                        <button
                          onClick={() => onClickDetail(product)}
                          className="whitespace-nowrap flex-1 hover:text-white hover:border-[#b22830] hover:bg-[#b22830] inline-block text-[12px] leading-5 border-[1px] border-solid border-[#cc9554] py-2 px-3 rounded-[5px] text-[#cc9554] uppercase transition"
                        >
                          Chi tiết
                        </button>
                        <button
                          onClick={() => onBuynow(product)}
                          className="whitespace-nowrap flex-1 hover:text-white hover:border-[#b22830] hover:bg-[#b22830] inline-block text-[12px] leading-5 border-[1px] border-solid border-[#cc9554] py-2 px-3 rounded-[5px] text-[#cc9554] uppercase transition"
                        >
                          Mua ngay
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ModalLogin */}
      {modalLogin && (
        <Modal
          isOpen={modalLogin}
          onRequestClose={() => setModalLogin(false)}
          contentLabel="Login Required Modal"
          className="modal-login"
          overlayClassName="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
        >
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <button
              onClick={() => setModalLogin(false)}
              className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800"
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Bạn cần đăng nhập trước khi mua hàng
            </h2>
            <button
              onClick={handleLoginRedirect}
              className="bg-blue-500 text-white px-4 py-2 rounded-md block mx-auto"
            >
              Đăng nhập
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ListProduct;

// {
/* <div className="filter mb-6 flex items-center gap-4">
                <div className="mb-4 flex-2">
                  <label>
                    <input
                      type="radio"
                      value="type"
                      checked={selectedFilter === "type"}
                      onChange={handleFilterChange}
                    />
                    Type
                  </label>
                  <label className="ml-4">
                    <input
                      type="radio"
                      value="title"
                      checked={selectedFilter === "title"}
                      onChange={handleFilterChange}
                    />
                    Title
                  </label>
                  <label className="ml-4">
                    <input
                      type="radio"
                      value="price"
                      checked={selectedFilter === "price"}
                      onChange={handleFilterChange}
                    />
                    Price
                  </label>
                </div>
                <div className="flex-1">
                  {selectedFilter === "type" && (
                    <input
                      type="text"
                      placeholder="Filter by type"
                      value={filterType}
                      onChange={handleFilterTypeChange}
                      className="p-2 border rounded mb-4 w-full border-[#cc9554]"
                    />
                  )}
                  {selectedFilter === "title" && (
                    <input
                      type="text"
                      placeholder="Filter by title"
                      value={filterTitle}
                      onChange={handleFilterTitleChange}
                      className="p-2 border rounded mb-4 w-full border-[#cc9554]"
                    />
                  )}
                  {selectedFilter === "price" && (
                    <div className="mb-4">
                      <label>Min Price: </label>
                      <input
                        type="number"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        className="p-2 border rounded mb-4 w-full border-[#cc9554]"
                      />
                      <label>Max Price: </label>
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        className="p-2 border rounded mb-4 w-full border-[#cc9554]"
                      />
                    </div>
                  )}
                </div>
              </div> */
// }
