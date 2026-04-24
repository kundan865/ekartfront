import api from "@/connect/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const editUser = createAsyncThunk(
    "user/editUser",
    async ({ userId, data }, { rejectWithValue }) => {
        try {
            const res = await api.put(`/admin/edit/user/${userId}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            return res?.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||   // Spring Boot custom error
                error?.response?.data ||           // plain string
                error?.message ||                  // axios error
                "Failed to edit user...";
            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);

export const addRole = createAsyncThunk(
    "admin/addRole",
    async ({ userId, role }, { rejectWithValue }) => {
        try {
            const res = await api.post(`/admin/add-role/${userId}`, { name: role },
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
                "Failed to add role...";
            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            )
        }
    }
);

export const removeRole = createAsyncThunk(
    "admin/removeRole",
    async ({ userId, role }, { rejectWithValue }) => {
        try {
            const res = await api.delete(`/admin/remove-role/${userId}`,{}, {
                data: { name: role },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            return res?.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||   // Spring Boot custom error
                error?.response?.data ||           // plain string
                error?.message ||                  // axios error
                "Failed to remove role...";


            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            )
        }
    }
);

export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/admin/delete/user/${userId}`,{}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            return response?.data;
        } catch (error) {
            const message =
                error?.response?.data?.message ||   // Spring Boot custom error
                error?.response?.data ||           // plain string
                error?.message ||                  // axios error
                "Failed to delete user...";

            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            )
        }
    }
);

export const fetchUsers = createAsyncThunk(
    "admin/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/admin/users",{}, {
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
                "Failed to fetch users...";
            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);

export const adminOrders = createAsyncThunk(
    "admin/orders",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/admin/orders",{}, {
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
                "Failed to fetch users...";
            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);

export const fetchAdminSales = createAsyncThunk(
    "admin/salse",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/admin/sales",{}, {
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
                "Failed to fetch users...";
            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);

export const changeOrderStatus = createAsyncThunk(
    "admin/cahange-order-status",
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.put("/admin/change-order-status",data, {
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
                "Failed to fetch users...";
            return rejectWithValue(
                typeof message === "string" ? message : JSON.stringify(message)
            );
        }
    }
);

