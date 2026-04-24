import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from "./cartThunks";

const initialState = {
    cart: null,
    loading: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
    },
    extraReducers: (builder) => {
        // fetchCart
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // addToCart
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        //  remove from cart
        builder
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });



        //  increase quantity
        builder
            .addCase(increaseQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(increaseQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(increaseQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        // decease quantity
        builder
            .addCase(decreaseQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(decreaseQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(decreaseQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


            // clear cart

            builder.addCase(clearCart.fulfilled,(state,action)=>{
                state.cart = action.payload;
            })


    },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;