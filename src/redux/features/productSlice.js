import api from "@/connect/api";
import { createSlice,} from "@reduxjs/toolkit";
import { addProduct, deleteProduct, fetchProducts, updateProduct } from "./productThunks";

const initialState = {

    products: null,

    fetching: false,

    deleting: false,

    adding:false,

    updating: false
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.fetching = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.fetching = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.fetching = false;
            });

        builder
            .addCase(addProduct.pending, (state, action) => {
                state.adding = true;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.adding = false;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.adding = false;
            })


        // delete product
        builder
            .addCase(deleteProduct.pending, (state, action) => {
                state.deleting = true;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.deleting = false;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.deleting = false;
            })

        builder
            .addCase(updateProduct.pending, (state, action) => {
                state.updating = true;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.updating = false;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.updating = false;
            })
    }
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
