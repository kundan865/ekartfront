import api from "@/connect/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendOtp = createAsyncThunk(
    "send/otp",
    async (email, { rejectWithValue }) => {
        try {
            const response = await api.post(`/user/send-otp/${email}`);

            return response?.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Payment verification failed";

            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);

export const changePassword = createAsyncThunk(
    "change/password",
    async (data, { rejectWithValue }) => {
        try {

            const response = await api.post("/user/reset-password", data);
            return response?.data;

        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Payment verification failed";

            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);

export const verifyOtp = createAsyncThunk(
    "verify/otp",
    async (data, { rejectWithValue }) => {
        try {

            const response = await api.post("/user/verify", data);
            return response?.data;

        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Payment verification failed";

            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);


export const login = createAsyncThunk(
    "user/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post("/user/login", data);

            return response?.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Payment verification failed";

            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);

export const signup = createAsyncThunk(
    "user/suignup",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post("/user/signup", data);

            return response?.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Payment verification failed";

            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);


export const logout = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.post("/user/logout", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            return response?.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Payment verification failed";

            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);

export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async ({ userId, data }, { rejectWithValue }) => {
        try {
            const res = await api.put(`/user/update/profile/${userId}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            return res?.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Payment verification failed";

            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);

export const createOrder = createAsyncThunk(
    "order/create",
    async ({ userId: userId, orderData: orderData }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/user/create-order/${userId}`, orderData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Payment verification failed";

            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);

export const verifyPayment = createAsyncThunk(
    "payment/verify",
    async (verifyData, { rejectWithValue }) => {
        try {
            const response = await api.post("/user/verify-payment", verifyData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Payment verification failed";

            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);

export const allAddress = createAsyncThunk(
    "all/address",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/user/get-all-address/${userId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "failed to add address";

            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);

export const addAddress = createAsyncThunk(
    "add/address",
    async ({ userId: userId, addressData: addressData }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/user/add-address/${userId}`, addressData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "failed to add address";

            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);

export const deleteAddress = createAsyncThunk(
    "delete/address",
    async (addressId, { rejectWithValue }) => {
        try {
            const response = await api.post(`/user/delete-address/${addressId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "failed to add address";

            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);

export const fetchUserOrders = createAsyncThunk(
    "user/orders",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/user/orders/${userId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "failed to add address";

            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);

export const cancelOrder = createAsyncThunk(
    "cancel/order",
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await api.put(`/user/order-cancel/${orderId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "failed to add address";

            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);

export const orderVerifySendOtp = createAsyncThunk(
    "order/send-otp",
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await api.post(`/user/order-send-otp/${orderId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "failed to add address";

            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);

export const orderVerifyOtp = createAsyncThunk(
    "order/verify-otp",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post(`/user/order-verify-otp`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "failed to add address";

            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);