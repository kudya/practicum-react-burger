import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { TFeedOrders } from "../../utils/types";

export type TFeedOrdersProfileStore = {
    wsConnected: boolean,
    data: TFeedOrders | null,
    error: string | null,
}

const initialState: TFeedOrdersProfileStore  = {
    wsConnected: false,
    data: null,
    error: null,
}

const feedOrdersProfileSlice = createSlice({
    name: 'feedOrdersProfile',
    initialState,
    reducers: {
        wsOpenFeedOrdersProfile: (state) => {
            state.wsConnected = true;
            state.error = null;
        },
        wsErrorFeedOrdersProfile: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        wsCloseFeedOrdersProfile: (state) => {
            state.wsConnected = false;
        },
        wsMessageFeedOrdersProfile: (state, action: PayloadAction<TFeedOrders>) => {
            state.data = action.payload;
        },
    }
})

export const feedOrdersProfileReducer = feedOrdersProfileSlice.reducer;
export const {
    wsOpenFeedOrdersProfile,
    wsErrorFeedOrdersProfile,
    wsCloseFeedOrdersProfile,
    wsMessageFeedOrdersProfile
} = feedOrdersProfileSlice.actions;

type TFeedOrdersProfileActionCreators = typeof feedOrdersProfileSlice.actions;

export type TFeedOrdersProfileActions = ReturnType<TFeedOrdersProfileActionCreators[keyof TFeedOrdersProfileActionCreators]>
