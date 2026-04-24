import { fetchAdminSales } from "@/redux/features/AdminThunks";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const statusColors = {
  Delivered: "text-green-600",
  Pending: "text-yellow-600",
  Cancelled: "text-red-600",
};

const AdminSales = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminSales = useSelector((state) => state?.admin?.adminSales)
  const recentOrders = adminSales?.recentOrders || [];
  const stats = adminSales?.stats || [];

  useEffect(() => {
    const loadAdminSales = async () => {
      try {
        const data = await dispatch(fetchAdminSales()).unwrap();
      } catch (error) {
        toast.error(
          error?.message || error?.error || "Something went wrong..."
        );
      }
    };

    loadAdminSales();
  }, [dispatch]);

  if (!adminSales) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 sm:p-4 md:p-6 lg:p-6 p-2">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-6">Sales Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl shadow"
            >
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <h2 className="text-2xl font-bold mt-2">
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">
            Sales Overview
          </h2>

          {/* Fake Chart UI */}
          <div className="h-64 flex items-end gap-3">
            {[40, 70, 50, 90, 60, 80, 30]?.map((h, i) => (
              <div
                key={i}
                className="bg-blue-500 w-full rounded-t-lg"
                style={{ height: `${h}%` }}
              ></div>
            ))}
          </div>
        </div>

        {/* recent orders */}
        <div className="bg-white rounded-2xl shadow">
          <div className="p-4 border-b font-semibold">
            Recent Orders
          </div>

          {/* ✅ Desktop / Tablet Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
                <tr>
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders?.map((order) => (
                  <tr key={order.id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium truncate max-w-30">
                      {order.id}
                    </td>
                    <td className="p-4">{order.customer.name}</td>
                    <td className="p-4 font-semibold">₹{order.amount}</td>
                    <td className={`p-4 ${statusColors[order.paymentStatus]}`}>
                      {order.paymentStatus}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => navigate(`/admin-order-details/${order.id}`)}
                        className="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Mobile Card Layout */}
          <div className="md:hidden divide-y">
            {recentOrders?.map((order) => (
              <div key={order.id} className="p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500 text-xs">Order ID</span>
                  <span className="font-medium">{order.id}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500 text-xs">Customer</span>
                  <span>{order.customer.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500 text-xs">Amount</span>
                  <span className="font-semibold">₹{order.amount}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs">Status</span>
                  <span className={`px-2 py-1 text-xs rounded ${statusColors[order.paymentStatus]}`}>
                    {order.paymentStatus}
                  </span>
                </div>

                {/* ✅ View Details Button */}
                <button
                  onClick={() => navigate(`/admin-order-details/${order?.id}`)}

                  className="w-full mt-2 px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* ✅ Empty State */}
          {recentOrders?.length === 0 && (
            <p className="text-center p-4 text-gray-500">
              No recent orders
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminSales;