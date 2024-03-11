import { createSlice } from '@reduxjs/toolkit';
import { makeOrder } from '../actions/order';

// export type TOrderStore = {
//     orderNumber: number | null,
//     orderName: string | null,
//     loading: boolean,
//     error: string | null,
// }

const initialState = {
    orderNumber: null,
    orderContent: [],
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(makeOrder.pending, (state) => {
                state.orderNumber = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(makeOrder.rejected, (state, action) => {
                state.orderNumber = null;
                state.orderName = null;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(makeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orderNumber = action.payload.order.number;
                state.orderName = action.payload.name;
            })
    }
});

export const orderReducer = orderSlice.reducer;
