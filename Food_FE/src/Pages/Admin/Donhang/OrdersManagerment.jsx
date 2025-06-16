import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatCurrencyVND } from "../../../Components/Common/finance";

export default function OrdersManagement() {
  const [currentStatus, setCurrentStatus] = useState("Chờ xác nhận");
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [totalSuccessAmount, setTotalSuccessAmount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [processingCount, setProcessingCount] = useState(0);
  const [shippingCount, setShippingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [canceledCount, setCanceledCount] = useState(0);
  const roleuser = localStorage.getItem("role");
  useEffect(() => {
    if (roleuser === "Customer") {
      navigate("/");
    }
  }, [navigate, roleuser]);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getOrderAdmin");
      setOrders(response.data);
      calculateTotalSuccessAmount(response.data);
      calculateOrderCounts(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const calculateTotalSuccessAmount = (orders) => {
    const totalAmount = orders
      .filter((order) => order.trangthai === "Đã giao") // Hoặc trạng thái thành công khác
      .reduce((sum, order) => sum + parseFloat(order.tongtien), 0); // Chuyển đổi giá thành số và cộng tổng
    setTotalSuccessAmount(totalAmount);
  };
  const handleStatusClick = (status) => {
    setCurrentStatus(status);
  };
  const calculateOrderCounts = (orders) => {
    setPendingCount(
      orders.filter((order) => order.trangthai === "Chờ xác nhận").length
    );
    setProcessingCount(
      orders.filter((order) => order.trangthai === "Đang xử lý").length
    );
    setShippingCount(
      orders.filter((order) => order.trangthai === "Đang giao").length
    );
    setCompletedCount(
      orders.filter((order) => order.trangthai === "Đã giao").length
    );
    setCanceledCount(
      orders.filter((order) => order.trangthai === "Đã hủy").length
    );
  };

  const statuses = [
    "Chờ xác nhận",
    "Đang xử lý",
    "Đang giao",
    "Đã giao",
    "Đã hủy",
  ];

  const handleShowDetails = (orderId) => {
    // Toggle the details visibility for the specific order
    setOrders(
      orders.map((order) => ({
        ...order,
        showDetails:
          order.iddonhang === orderId ? !order.showDetails : order.showDetails,
      }))
    );
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.trangthai === currentStatus &&
      order.tennguoinhan.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const updateOrderStatus = async (id, newStatus) => {
    console.log(id, newStatus);
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
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-sky-200 my-3 ">
        <div className="flex flex-col gap-2 p-4">
          <div>
            Tổng số tiền Nhận được là:{" "}
            <span>{formatCurrencyVND(totalSuccessAmount.toString())}</span>
          </div>
          <div>
            Tổng số đơn hàng Chờ xác nhận là: <span>{pendingCount}</span>
          </div>
          <div>
            Tổng số đơn hàng Chờ xử lý là: <span>{processingCount}</span>
          </div>
          <div>
            Tổng số đơn hàng Đang giao là: <span>{shippingCount}</span>
          </div>
          <div>
            Tổng số đơn hàng thành công là: <span>{completedCount}</span>
          </div>
          <div>
            Tổng số đơn hàng bị hủy là: <span>{canceledCount}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center bg-blue-500 text-white rounded-md overflow-hidden">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => handleStatusClick(status)}
            className={`flex-1 px-4 py-2 text-center ${
              currentStatus === status ? "bg-blue-700" : "bg-blue-500"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Orders Management</h2>
        <p className="mt-2">Current Status: {currentStatus}</p>
        <div className="flex mt-4">
          <input
            type="text"
            placeholder="Search by recipient name"
            className="px-4 py-2 border border-gray-300 rounded-md  w-full mb-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Tên người nhận
                </th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Số điện thoại
                </th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Địa chỉ nhận
                </th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Tổng tiền
                </th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.iddonhang}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.iddonhang}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.tennguoinhan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.sdtnguoinhan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.diachinhan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.tongtien}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.trangthai}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex flex-col ">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                      onClick={() => handleShowDetails(order.iddonhang)}
                    >
                      {order.showDetails ? "Hide Details" : "Show Details"}
                    </button>
                    {order.trangthai !== "Đã giao" &&
                      order.trangthai !== "Đã hủy" && (
                        <button
                          onClick={() =>
                            updateOrderStatus(order.iddonhang, "Đã hủy")
                          }
                          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
                        >
                          Huỷ đơn
                        </button>
                      )}
                    {order.trangthai === "Chờ xác nhận" && (
                      <button
                        onClick={() =>
                          updateOrderStatus(order.iddonhang, "Đang xử lý")
                        }
                        className="mt-4 bg-green-500 text-white px-3 py-1 rounded-md"
                      >
                        Xác nhận
                      </button>
                    )}
                    {order.trangthai === "Đang xử lý" && (
                      <button
                        onClick={() =>
                          updateOrderStatus(order.iddonhang, "Đang giao")
                        }
                        className="mt-4 bg-green-500 text-white px-3 py-1 rounded-md"
                      >
                        Giao hàng
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          {filteredOrders.map(
            (order) =>
              order.showDetails && (
                <div key={order.iddonhang} className="mt-4">
                  <h3 className="text-xl font-semibold">
                    Order ID: {order.iddonhang}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-md">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Tên sản phẩm
                          </th>
                          <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Giá
                          </th>
                          <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Số lượng
                          </th>
                          <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Hình ảnh
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {order.details.map((item) => (
                          <tr key={item.iddonhangchitiet}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {item.tensanpham}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {item.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {item.Quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <img
                                src={`http://localhost:3000/assets/${item.hinhanh}`}
                                alt={item.tensanpham}
                                className="w-16 h-16 object-cover"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
