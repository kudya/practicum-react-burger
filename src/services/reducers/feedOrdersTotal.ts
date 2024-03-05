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
        wsOpen: (state) => {
            state.wsConnected = true;
            state.error = null;
        },
        wsError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        wsClose: (state) => {
            state.wsConnected = false;
        },
        wsMessage: (state, action: PayloadAction<TFeedOrders>) => {
            state.data = action.payload;
        },
    }
})

export const feedOrdersReducer = feedOrdersTotalSlice.reducer;
export const { wsOpen, wsError, wsClose, wsMessage } = feedOrdersTotalSlice.actions;

type TFeedOrdersTotalActionCreators = typeof feedOrdersTotalSlice.actions;

export type TFeedOrdersTotalActions = ReturnType<TFeedOrdersTotalActionCreators[keyof TFeedOrdersTotalActionCreators]>
