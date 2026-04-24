import { createSlice } from "@reduxjs/toolkit";
import { allAddress, fetchUserOrders, login, logout, updateProfile } from "./userThunks";


const userSlice = createSlice({
    name: "User",
    initialState: {
        user: null,
        logging: false,
        logouting: false,

        addresses: null,

        orders: null,

        updating: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
        , setAddersses: (state, action) => {
            state.addresses = action.payload;
        },
        setUserOrders:(state,action)=>{
            state.orders=action.payload;
        }
    },
    extraReducers: (builder) => {

        // login
        builder.addCase(login.pending, (state, action) => {
            state.logging = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.logging = false;
        })
        builder.addCase(login.rejected, (state, action) => {
            state.logging = false;
        })

        // logout 
        builder.addCase(logout.pending, (state, action) => {
            state.logouting = true;
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.logouting = false;
        })
        builder.addCase(logout.rejected, (state, action) => {
            state.logouting = false;
        })

        // update profile
        builder
            .addCase(updateProfile.pending, (state, action) => {
                state.updating = true;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.updating = false;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.updating = false;
            })


        // get all address
        builder.addCase(allAddress.fulfilled, (state, action) => {
            state.addresses = action.payload;
        })

        // get all orders
        builder.addCase(fetchUserOrders.fulfilled,(state,action)=>{
            state.orders=action.payload;
        })
    }
})
export const {
    setUser, setAddersses,setUserOrders
} = userSlice.actions;

export default userSlice.reducer;