
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminOrders, changeOrderStatus } from "@/redux/features/AdminThunks";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const AdminOrders = () => {
  const [openOrder, setOpenOrder] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const orders = useSelector((state) => state?.admin?.adminOrders)  || [];


  const handleStatusChange = (id, value) => {
    setOrderId(id);
    setStatus(value);
  };

  const handleChangeStatus=async()=>{
    if(orderId==="" || status==="select"){
      toast.error("please select status first..")
      return;
    }
    try{
      const data={
        orderId:orderId,
        status:status
      }
      const response=await dispatch(changeOrderStatus(data)).unwrap();
      console.log("response ",response)
      toast.success(response);
    }catch(error){
      toast.error(error?.message || error?.error || error || "Something went wrong...")
    }
  }

  if (!orders) {
  return <div>Loading orders...</div>;
}

  useEffect(() => {
    const fetchAdminOrders = async () => { 
      try {
        const data = await dispatch(adminOrders()).unwrap();
        console.log("data ",data)
      } catch (error) {
        toast.error(
          error?.message || error?.error || "Something went wrong..."
        );
      }
    };

    fetchAdminOrders();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 sm:p-6 md:p-6 p-2">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>

        <div className="space-y-6">
          {orders?.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow p-5">

              {/* Top Info */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">

                <div>
                  <p className="font-semibold text-lg">{order?.id}</p>
                  <p className="text-sm text-gray-500">{order?.date}</p>
                </div>

                <div className="flex items-center gap-3 mt-3 md:mt-0">
                  <span className={`px-3 py-1 rounded-full text-sm ${statusColors[order.orderStatus]}`}>
                    {order?.status}
                  </span>
                  <p className="font-semibold">₹{order?.total}</p>
                </div>
              </div>

              {/* Customer + Address */}
              <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">

                <div>
                  <p className="font-medium">Customer</p>
                  <p>{order?.customer?.name}</p>
                  <p className="text-gray-500">{order?.customer?.phone}</p>
                </div>

                <div>
                  <p className="font-medium">Delivery Address</p>
                  <p>
                    {order?.address?.address}, {order?.address?.city}
                  </p>
                  <p className="text-gray-500">
                    {order?.address?.address} - {order.address.zip}
                  </p>
                </div>

              </div>

              {/* Toggle Details */}
              <button
                onClick={() =>
                  setOpenOrder(openOrder === order.id ? null : order.id)
                }
                className="text-blue-600 text-sm mt-3"
              >
                {openOrder === order?.id ? "Hide Details" : "View Details"}
              </button>

              {/* Expanded Section */}
              {openOrder === order.id && (
                <div className="mt-4 border-t pt-4">

                  {/* Items */}
                  <div>
                    <p className="font-medium mb-2">Items</p>
                    {order?.items?.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm mb-1">
                        <span>{item?.name} (x{item?.quantity})</span>
                        <span>₹{item?.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Payment */}
                  <div className="mt-4">
                    <p className="font-medium">Payment</p>
                    <p className="text-sm text-gray-600">
                      Status: {order?.paymentStatus}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-3">
                    <select
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="border px-3 py-2 rounded-lg text-sm"
                    >
                      <option value="select">SELECT</option>
                      <option value="PENDING">Pending</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>

                    <button onClick={()=>handleChangeStatus()}
                     className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                      Update
                    </button>

                  </div>
                  <div className="mt-4 flex gap-3">
                    <button className="bg-pink-600 p-3 rounded-2xl"
                     onClick={()=>navigate(`/admin-order-details/${order?.id}`)}>View Details</button>
                  </div>

                </div>
              )}
            </div>
          ))}
        </div>

        {orders?.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No orders available
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
