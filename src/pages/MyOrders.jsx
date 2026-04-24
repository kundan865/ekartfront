import { fetchUserOrders } from "@/redux/features/userThunks";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// const orders = [
//   {
//     id: "ORD12345",
//     date: "2026-04-10",
//     status: "Delivered",
//     total: 1499,
//     items: [
//       { name: "Wireless Headphones", qty: 1 },
//       { name: "Phone Cover", qty: 2 },
//     ],
//   },
//   {
//     id: "ORD67890",
//     date: "2026-04-12",
//     status: "Pending",
//     total: 799,
//     items: [
//       { name: "Bluetooth Speaker", qty: 1 },
//     ],
//   },
// ];

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const { orders, user } = useSelector((state) => state?.user)


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await dispatch(fetchUserOrders(user?.id)).unwrap();
      } catch (error) {
        toast.error(error?.message || error?.error || error || "Something went wrong...")
      }
    }
    fetchOrders();
  }, [dispatch])


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        {/* Orders List */}
        <div className="space-y-6">
          {orders?.map((order) => (
            <div
              key={order?.id}
              className="bg-white shadow-md rounded-2xl p-5 border"
            >
              {/* Top Section */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID: <span className="font-medium">{order?.id}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {order?.date}
                  </p>
                </div>

                <div className="mt-2 md:mt-0 flex items-center gap-3">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${getStatusColor(
                      order?.orderStatus
                    )}`}
                  >
                    {order?.orderStatus}
                  </span>
                  <p className="font-semibold text-lg">
                    ₹{order.total}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="border-t pt-4 space-y-2">
                {order?.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>{item?.name}</span>
                    <span>Qty: {item?.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <button onClick={()=>navigate(`/user-order-details/${order?.id}`)}
                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  View Details
                </button>
                <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">
                  {
                    order?.paymentStatus
                  }
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {orders?.length === 0 && (
          <div className="text-center mt-20">
            <p className="text-gray-500 text-lg">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;