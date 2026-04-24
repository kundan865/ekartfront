import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/connect/api";

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (userId, { rejectWithValue }) => {
        try {
            const res = await api.get(`/cart/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            return res.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||   // Spring Boot custom error
                error?.response?.data ||           // plain string
                error?.message ||                  // axios error
                "Failed to decrease item";
            return rejectWithValue(message);
        }
    }
);

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, productId }, { rejectWithValue }) => {

        try {
            const res = await api.post("/cart/add",
                { userId, productId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            return res.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||   // Spring Boot custom error
                error?.response?.data ||           // plain string
                error?.message ||                  // axios error
                "Failed to decrease item";

            return rejectWithValue(message);
        }
    }
);

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async ({ userId, productId }, { rejectWithValue }) => {

        try {
            const res = await api.post("/cart/remove",
                { userId, productId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            return res.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||   // Spring Boot custom error
                error?.response?.data ||           // plain string
                error?.message ||                  // axios error
                "Failed to decrease item";

            return rejectWithValue(message);
        }
    }
);

export const increaseQuantity = createAsyncThunk(
    "cart/increateQuantity",
    async ({ userId, productId }, { rejectWithValue }) => {

        try {
            const res = await api.post("/cart/increase-quantity",
                { userId, productId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            return res?.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||   // Spring Boot custom error
                error?.response?.data ||           // plain string
                error?.message ||                  // axios error
                "Failed to decrease item";

            return rejectWithValue(message);

        }
    }
);

export const decreaseQuantity = createAsyncThunk(
    "cart/decreaseQuantity",
    async ({ userId, productId }, { rejectWithValue }) => {
        try {
            const res = await api.post("/cart/decrease-quantity", { userId, productId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            return res?.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||   // Spring Boot custom error
                error?.response?.data ||           // plain string
                error?.message ||                  // axios error
                "Failed to decrease item";

            return rejectWithValue(message);
        }
    }
);

export const clearCart = createAsyncThunk(
    "clear/cart",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.post(`/user/clear-cart/${userId}`, {}, {
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