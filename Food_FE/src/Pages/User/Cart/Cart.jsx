import React, { useState } from "react";
import { useCart } from "../../Context/CartContext";
import { formatCurrencyVND } from "../../Components/finance";
import axios from "axios";
import { Navigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, confirmCart, updateQuantity, clearCart } =
    useCart();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    diachinhan: "",
    tennguoinhan: "",
    sdtnguoinhan: "",
  });
  const name = localStorage.getItem("Name");
  const postData = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/order", data);
      console.log(response.data);
      clearCart();
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };
  const handleConfirmCart = async () => {
    console.log("Đã xác nhận giỏ hàng:", cart);
    console.log("Name: " + name);
    console.log("solongsanpham: " + solongsanpham);
    console.log("tongtien: " + tongtien);
    console.log("trangthai" + trangthai);
    setShowForm(true);
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const data = {
      cart: cart,
      name: name,
      solongsanpham: solongsanpham,
      tongtien: tongtien,
      trangthai: trangthai,
      diachinhan: formData.diachinhan,
      tennguoinhan: formData.tennguoinhan,
      sdtnguoinhan: formData.sdtnguoinhan,
    };
    console.log(data);
    await postData(data);
    Navigate("/Orders");
  };
  const handleIncreaseQuantity = (productId) => {
    const product = cart.find((item) => item.idsp === productId);
    if (product) {
      const newQuantity = product.quantity + 1;
      updateQuantity(productId, newQuantity);
    }
  };

  const handleDecreaseQuantity = (productId) => {
    const product = cart.find((item) => item.idsp === productId);
    if (product && product.quantity > 1) {
      const newQuantity = product.quantity - 1;
      updateQuantity(productId, newQuantity);
    }
  };
  const solongsanpham = cart.reduce((total, item) => total + item.quantity, 0);
  const tongtien = cart.reduce(
    (accumulator, item) => accumulator + item.giaban * item.quantity,
    0
  );

  const trangthai = "Chờ xác nhận";
  return (
    <div className="cart-page py-11">
      <div className="news-wrapper px-[15px] max-w-[1200px] mx-auto">
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-4">
            Tổng số lượng trong giỏ hàng: {solongsanpham}
          </h2>
          <h3 className="text-xl font-semibold mb-2">Chi tiết giỏ hàng:</h3>
          {cart.length > 0 ? (
            <>
              <ul className="grid grid-cols-1 gap-4">
                {cart.map((item) => (
                  <li
                    key={item.idsp}
                    className="flex items-center border p-4 rounded-md shadow-md"
                  >
                    <img
                      src={`http://localhost:3000/assets/${item.hinhanh}`}
                      alt={item.tensp}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-semibold">{item.tensp}</p>
                          <p className="text-gray-600 text-base">
                            {formatCurrencyVND(item.giaban.toString())}
                          </p>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleDecreaseQuantity(item.idsp)}
                              className="text-gray-500 border border-gray-300 px-2 py-1 rounded"
                            >
                              -
                            </button>
                            <span className="text-base">{item.quantity}</span>
                            <button
                              onClick={() => handleIncreaseQuantity(item.idsp)}
                              className="text-gray-500 border border-gray-300 px-2 py-1 rounded"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.idsp)}
                          className="text-red-500 ml-4"
                        >
                          x
                        </button>
                      </div>
                      <div className="inline-block border-[.25px] border-[#efefef] w-full"></div>
                      <p className="text-gray-600 text-base">
                        <span className="text-xs">Tổng tiền: </span>
                        {formatCurrencyVND(
                          (item.giaban * item.quantity).toString()
                        )}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="inline-block border-[.5px] border-[#dbdbdb] w-full mt-5"></div>
              <div>
                Tổng giá trị đơn hàng: {formatCurrencyVND(tongtien.toString())}
              </div>
            </>
          ) : (
            <p>Giỏ hàng trống</p>
          )}
          {cart.length > 0 && (
            <button
              onClick={handleConfirmCart}
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
            >
              Xác nhận giỏ hàng
            </button>
          )}
          {/* Form nhập thông tin người nhận */}
          {showForm && (
            <form onSubmit={handleOrderSubmit} className="mt-4">
              {/* Input địa chỉ nhận hàng */}
              
              {/* Input tên người nhận */}
              <div className="mb-4">
                <label
                  htmlFor="tennguoinhan"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tên người nhận
                </label>
                <input
                  type="text"
                  id="tennguoinhan"
                  name="tennguoinhan"
                  value={formData.tennguoinhan}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              {/* Input số điện thoại người nhận */}
              <div className="mb-4">
                <label
                  htmlFor="sdtnguoinhan"
                  className="block text-sm font-medium text-gray-700"
                >
                  Số điện thoại người nhận
                </label>
                <input
                  type="text"
                  id="sdtnguoinhan"
                  name="sdtnguoinhan"
                  value={formData.sdtnguoinhan}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              {/* Nút xác nhận đơn hàng */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Xác nhận đơn hàng
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
