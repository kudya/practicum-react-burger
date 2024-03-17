import { createSlice } from '@reduxjs/toolkit';
import { makeOrder } from '../actions/order';

export type TOrderStore = {
    orderNumber: number | null,
    loading: boolean,
    error: string | null,
}

const initialState: TOrderStore = {
    orderNumber: null,
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
                state.loading = false;
                state.error = action.error.message ?? 'Произошла ошибка при сборе заказа';
            })
            .addCase(makeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orderNumber = action.payload.order.number;
            })
    }
});

export const orderReducer = orderSlice.reducer;
