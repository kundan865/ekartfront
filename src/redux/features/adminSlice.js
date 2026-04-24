import { createSlice } from "@reduxjs/toolkit";
import { addRole, adminOrders, editUser, fetchAdminSales, fetchUsers, removeRole } from "./AdminThunks";

const userSlice = createSlice({
    name: "admin",
    initialState: {
        allUsers: null,
        fetching: false,

        roleAdded: false,
        roleRemoved: false,
        userEdited: false,

        editing: false,

        adminOrders: null,
        adminSales: null
    },
    reducers: {
        setAllUsers: (state, action) => {
            state.allUsers = action.payload;
        },
        setAdminOrder: (state, action) => {
            state.adminOrders = action.payload;
        },
        setAdminSales: (state, action) => {
            state.adminSales = action.payload;
        }
    },
    extraReducers: (builder) => {

        // fetch users
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.fetching = true;
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.allUsers = action.payload;
            state.fetching = false;
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.fetching = false;
        })

        // edit users
        builder.addCase(editUser.pending, (state, action) => {
            state.editing = true;
        })
        builder.addCase(editUser.fulfilled, (state, action) => {
            state.editing = false;
        })
        builder.addCase(editUser.rejected, (state, action) => {
            state.editing = false;
        })

        // add role
        builder.addCase(addRole.pending, (state, action) => {
            state.roleAdded = true;
        })
        builder.addCase(addRole.fulfilled, (state, action) => {
            state.roleAdded = false;
        })
        builder.addCase(addRole.rejected, (state, action) => {
            state.roleAdded = false;
        })

        // add role
        builder.addCase(removeRole.pending, (state, action) => {
            state.roleRemoved = true;
        })
        builder.addCase(removeRole.fulfilled, (state, action) => {
            state.roleRemoved = false;
        })
        builder.addCase(removeRole.rejected, (state, action) => {
            state.roleRemoved = false;
        })

        // admin orders
        builder.addCase(adminOrders.fulfilled, (state, action) => {
            state.adminOrders = action.payload;
        })

        // admin sales
        builder.addCase(fetchAdminSales.fulfilled, (state, action) => {
            state.adminSales = action.payload;
        })
    },
})
export const { setAllUsers, setAdminOrder, setAdminSales } = userSlice.actions;

export default userSlice.reducer;