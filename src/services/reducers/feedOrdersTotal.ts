import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { TFeedOrders } from "../../utils/types";

export type TFeedOrdersTotalStore = {
    wsConnected: boolean,
    data: TFeedOrders | null,
    error: string | null,
}

const initialState: TFeedOrdersTotalStore  = {
    wsConnected: false,
    data: null,
    error: null,
}

const feedOrdersTotalSlice = createSlice({
    name: 'feedOrdersTotal',
    initialState,
    reducers: {
        wsOpenFeedOrders: (state) => {
            state.wsConnected = true;
            state.error = null;
        },

        wsErrorFeedOrders: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },

        wsCloseFeedOrders: (state) => {
            state.wsConnected = false;
        },

        wsMessageFeedOrders: (state, action: PayloadAction<TFeedOrders>) => {
            state.data = action.payload;
        },
    }
})

export const feedOrdersReducer = feedOrdersTotalSlice.reducer;
export const {
    wsOpenFeedOrders,
    wsErrorFeedOrders,
    wsCloseFeedOrders,
    wsMessageFeedOrders
} = feedOrdersTotalSlice.actions;

type TFeedOrdersTotalActionCreators = typeof feedOrdersTotalSlice.actions;

export type TFeedOrdersTotalActions = ReturnType<TFeedOrdersTotalActionCreators[keyof TFeedOrdersTotalActionCreators]>
