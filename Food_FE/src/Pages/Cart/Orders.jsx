import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatCurrencyVND } from "../../Components/Common/finance";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const nameuser = localStorage.getItem("Name");
  const [openDetails, setOpenDetails] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/order/${nameuser}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [nameuser]);

  const updateOrderStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/order/${id}`, {
        trangthai: newStatus,
      });
      // Cập nhật trạng thái trong giao diện
      setOrders(
        orders.map((order) =>
          order.iddonhang === id ? { ...order, trangthai: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const toggleDetail = (id) => {
    setOpenDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-3xl font-bold text-center mb-8">Orders</h1>

      {/* Các trạng thái đơn hàng */}
      {["Chờ xác nhận", "Đang xử lý", "Đang giao", "Đã giao", "Đã hủy"].map(
        (status) => (
          <div key={status} className="bg-gray-100 rounded-lg p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">{status}</h2>
            <div className="flex flex-col gap-2">
              {orders
                .filter((order) => order.trangthai === status)
                .map((order) => (
                  <div key={order.iddonhang} className=" py-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-4 h-4 ${statusColor[status]} rounded-full`}
                      ></div>
                      <p className="text-gray-700">{`Đơn hàng số #${order.iddonhang}`}</p>
                      <button
                        className="py-2 px-3.5 bg-green-300 rounded-md"
                        onClick={() => toggleDetail(order.iddonhang)}
                      >
                        {openDetails[order.iddonhang]
                          ? "Thu gọn"
                          : "Xem chi tiết"}
                      </button>
                    </div>

                    {/* Chi tiết đơn hàng */}
                    {openDetails[order.iddonhang] && (
                      <div className="mt-4 flex flex-col gap-3">
                        {order.details.map((detail) => (
                          <div
                            key={detail.iddonhangchitiet}
                            className="flex items-center space-x-4 "
                          >
                            <img
                              src={`http://localhost:3000/assets/${detail.hinhanh}`}
                              alt={detail.tensanpham}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                              <p className="text-gray-700">
                                {detail.tensanpham}
                              </p>
                              <p className="text-gray-500">{`Số lượng: ${detail.Quantity}`}</p>
                              <p className="text-gray-500">{`Giá: ${formatCurrencyVND(
                                detail.price.toString()
                              )}`}</p>
                            </div>
                          </div>
                        ))}
                        <p className="text-gray-700">{}</p>
                      </div>
                    )}
                    <div className="block border-[.25px] border-[#cccccc] my-2"></div>
                    <p>
                      Tổng giá trị đơn hàng:{" "}
                      <span>
                        {formatCurrencyVND(order.tongtien.toString())}
                      </span>
                    </p>
                    {status === "Chờ xác nhận" && (
                      <button
                        onClick={() =>
                          updateOrderStatus(order.iddonhang, "Đã hủy")
                        }
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Huỷ đơn
                      </button>
                    )}
                    {status === "Đang giao" && (
                      <button
                        onClick={() =>
                          updateOrderStatus(order.iddonhang, "Đã giao")
                        }
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
                      >
                        Đã nhận hàng
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

const statusColor = {
  "Chờ xác nhận": "bg-yellow-500",
  "Đang xử lý": "bg-blue-500",
  "Đang giao": "bg-orange-500",
  "Đã giao": "bg-green-500",
  "Đã hủy": "bg-red-500",
};

export default Orders;
