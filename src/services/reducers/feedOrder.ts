import { createSlice } from '@reduxjs/toolkit';
import { getOrderByNumber } from '../actions/order';
import { TFeedOrder } from "../../utils/types";

export type TFeedOrderStore = {
    order: TFeedOrder | null,
    loading: boolean,
    error: string | null,
}

const initialState: TFeedOrderStore = {
    order: null,
    loading: false,
    error: null,
};

const feedOrderSlice = createSlice({
    name: 'feedOrder',
    initialState,
    reducers: {
        // @ts-ignore
        clearOrder: {
            reducer: (state) => {
                state.order = null;
                state.loading = false;
                state.error = null;
            },
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrderByNumber.pending, (state) => {
                state.order = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderByNumber.rejected, (state, action ) => {
                state.order = null;
                state.loading = false;
                state.error = action.error.message ?? 'Произошла ошибка при получении информации о заказе';
            })
            .addCase(getOrderByNumber.fulfilled, (state, action) => {
                const { orders } = action.payload;
                state.loading = false;
                state.order = orders[0];
            })
    }
});

export const feedOrderReducer = feedOrderSlice.reducer;
export const { clearOrder } = feedOrderSlice.actions;

type TFeedOrderActionCreators = typeof feedOrderSlice.actions;
export type TFeedOrderActions = ReturnType<TFeedOrderActionCreators[keyof TFeedOrderActionCreators]>;
