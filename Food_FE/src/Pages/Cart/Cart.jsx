import React, { useEffect, useState } from "react";
import { useCart } from "../../Context/CartContext";
import { formatCurrencyVND } from "../../Components/Common/finance";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, confirmCart, updateQuantity, clearCart } =
    useCart();
  const [data, setData] = useState();
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    diachinhan: "",
    tennguoinhan: "",
    sdtnguoinhan: "",
    city: "",
    trangthai: "Chờ xác nhận",
  });
  
  const [shippings, setShippings] = useState([])
  const [shipping, setShipping] = useState(0)

  const [vouchers, setVouchers] = useState([])
  const [voucherCode, setVoucherCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);


  const name = localStorage.getItem("Name");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getProduct");
        setData(response.data);
        
      } catch (err) {
        console.log(err);
      } finally {
        
      }
    };

    const getShippings = async() => {
      try {
        const response = await axios.get(
          "http://localhost:3000/shippings"
        );
        setShippings(response.data);
       
      } catch (err) {

      } 
    }

    const getVoucers = async() => {
      try {
        const response = await axios.get("http://localhost:3000/vouchers")
        setVouchers(response.data)

      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
    getShippings()
    getVoucers()
  }, []);

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
    setShowForm(true);
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrderSubmit = async (e) => {
    if (
      !formData.diachinhan ||
      !formData.tennguoinhan ||
      !formData.sdtnguoinhan
    ) {
      alert("ban can nhap day dur");
    }
    e.preventDefault();
    const data = {
      cart: cart,
      name: name,
      solongsanpham: solongsanpham,
      tongtien: (parseFloat(tongtien)+ parseFloat(shipping) - parseFloat(discountAmount)),
      trangthai: formData.trangthai,
      diachinhan: formData.diachinhan + " " + formData.city,
      tennguoinhan: formData.tennguoinhan,
      sdtnguoinhan: formData.sdtnguoinhan,
    };
   
    await postData(data);
    navigate("/Orders");
  };
  const handleIncreaseQuantity = async (productId) => {
    const productdatasoluong = data.find((item) => item.idsp === productId);
    const product = cart.find((item) => item.idsp === productId);
    if (product) {
      const newQuantity = product.quantity + 1;
      if (newQuantity > productdatasoluong.soluong) {
        alert("Ban khong the them qua so luong cua san pham");
        return;
      } else {
        updateQuantity(productId, newQuantity);
      }
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



  useEffect(() => {
        if (voucherCode.trim() === "") {
            setDiscountAmount(0);
            return;
        }

        // const saved = localStorage.getItem('saveVouchers');
        if (vouchers) {
            try {
                // const vouchers = JSON.parse(saved);
                const found = vouchers.find(v => v.code.toLowerCase() === voucherCode.toLowerCase());
                if (found) {
                    // setVoucher(found);

                    const discount = found.type === 'percent'
                        ? Math.floor((found.value / 100) * tongtien)
                        : found.value;

                    setDiscountAmount(discount);
                } else {
                    // setVoucher(null);
                    setDiscountAmount(0);
                }
            } catch (e) {
                console.error("Lỗi đọc voucher:", e);
            }
        }
    }, [voucherCode, cart]);

  
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
                      {/* <p className="text-gray-600 text-base">
                        <span className="text-xs">Tổng tiền: </span>
                        {formatCurrencyVND(
                          (item.giaban * item.quantity).toString()
                        )}
                      </p> */}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="inline-block border-[.5px] border-[#dbdbdb] w-full mt-5"></div>
              
          
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
              <div className="mb-4">
                <label
                  htmlFor="diachinhan"
                  className="block text-sm font-medium text-gray-700"
                >
                  Địa chỉ nhận hàng
                </label>
                <input
                  type="text"
                  id="diachinhan"
                  name="diachinhan"
                  value={formData.diachinhan}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Thành phố
                  </label>
                   <select
                      name="city"
                      value={formData.city}
                      onChange={(e) => {
                        setShipping(e.target.value)
                        handleInputChange(e)
                        console.log(shipping)
                      }}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      {
                        shippings.map(shipping => <option key={shipping.id} value={shipping.price}>
                                                    {shipping.city}
                                                  </option>)
                      }
                    </select>
               
              </div>
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

              <div className="mb-4">
                <label
                  htmlFor="voucher"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nhập mã khuyến mại
                </label>
                <input
                  type="text"
                  name="voucher"
                  value={voucherCode}
                  onChange={e => {
                    handleInputChange(e)
                    setVoucherCode(e.target.value)
                  }}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>


              <div className='flex flex-col gap-3 py-3'>
                <div>
                  Tạm tính: <strong>{formatCurrencyVND(tongtien.toString())}</strong>
                </div>
                <div>
                  Phí vận chuyển: <strong>{formatCurrencyVND(shipping.toString())}</strong>
                </div>
                <div>
                  Khuyến mại: <strong>-{formatCurrencyVND(discountAmount.toString())}</strong>
                </div>
                <div className="text-[1.4rem]">
                  Tổng giá trị đơn hàng: <strong>{formatCurrencyVND((parseFloat(tongtien) + parseFloat(shipping) - parseFloat(discountAmount)).toString())}</strong>
                </div>
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
