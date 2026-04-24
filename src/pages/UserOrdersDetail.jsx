import { cancelOrder } from "@/redux/features/userThunks";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const UserOrdersDetail = () => {

    const params = useParams();
    const { orderId } = params;
    const dispatch=useDispatch();

    const orders = useSelector((state) => state?.user?.orders)

    const order = orders.find((order) => order?.id === orderId)

    const getStatusColor = (status) => {
        switch (status) {
            case "Delivered":
                return "bg-green-100 text-green-600";
            case "Pending":
                return "bg-yellow-100 text-yellow-600";
            case "Cancelled":
                return "bg-red-100 text-red-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    const handleOrderCancel=async(orderId)=>{
        try{
            const response=await dispatch(cancelOrder(orderId)).unwrap();
            toast.success(response || "Order cancelled...")
        }catch(error){
            toast.error(error?.message || error?.error || error || "Something went wrong...");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">

                {/* Header */}
                <div className="flex justify-between items-center border-b pb-4">
                    <div>
                        <h2 className="text-xl font-semibold">Order Details</h2>
                        <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                    </div>
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}
                    >
                        {order.orderStatus}
                    </span>
                </div>

                {/* Order Info */}
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">Order Date</p>
                        <p className="font-medium">{order.date}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Total Amount</p>
                        <p className="font-medium">₹{order.total}</p>
                    </div>
                </div>

                {/* Items */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Items</h3>
                    <div className="space-y-3">
                        {order.items.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center border p-3 rounded-lg"
                            >
                                <p className="font-medium">{item.name}</p>
                                <p className="text-gray-600">Qty: {item.quantity}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 border-t pt-4 flex justify-between items-center">
                    <p className="text-lg font-semibold">Total</p>
                    <p className="text-xl font-bold text-green-600">
                        ₹{order.total}
                    </p>
                </div>

                {
                    order?.paymentStatus==="PAID" && (
                        <div className="mt-6 border-t pt-4 flex justify-between items-center">
                            <p className="text-lg font-semibold">Order</p>
                            <button onClick={()=>handleOrderCancel(order?.id)}
                             className="text-xl font-bold bg-amber-300 p-3 rounded-2xl text-red-600">
                                Cancel
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default UserOrdersDetail;