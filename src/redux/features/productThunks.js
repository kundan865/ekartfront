
import api from "@/connect/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/products");
      return response.data;
    } catch (error) {
      const message =
                error?.response?.data?.message ||   // Spring Boot custom error
                error?.response?.data ||           // plain string
                error?.message ||                  // axios error
                "Failed to fetch product...";
            return rejectWithValue(message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/admin/add/product/${userId}`, data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
                error?.response?.data?.message ||   // Spring Boot custom error
                error?.response?.data ||           // plain string
                error?.message ||                  // axios error
                "Failed to add product...";
            return rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/delete/product/${productId}`,{},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return true;
    } catch (error) {
      const message =
                error?.response?.data?.message ||   // Spring Boot custom error
                error?.response?.data ||           // plain string
                error?.message ||                  // axios error
                "Failed to delete product...";
            return rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ productId ,formData}, { rejectWithValue }) => {
    try {
      const response=await api.put(`/admin/update/product/${productId}`,formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response?.data;
    } catch (error) {
      const message =
                error?.response?.data?.message ||   // Spring Boot custom error
                error?.response?.data ||           // plain string
                error?.message ||                  // axios error
                "Failed to update product...";
            return rejectWithValue(message);
    }
  }
);