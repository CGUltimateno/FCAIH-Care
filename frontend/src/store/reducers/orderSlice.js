import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders, updateOrder } from "../actions/orderActions";

const initialState = {
    orders: [],
    status: 'idle',
    error: null
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                const updatedOrder = action.payload;
                const index = state.orders.findIndex(order => order.id === updatedOrder.id);
                if (index !== -1) {
                    state.orders[index] = updatedOrder;
                }
            })
    },
});

export default orderSlice.reducer;