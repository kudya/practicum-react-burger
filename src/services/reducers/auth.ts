import { createSlice } from '@reduxjs/toolkit';
import { registerUser, login, logout } from '../actions/auth';
import {TUserData} from "../../utils/types";

export type TAuthStore = {
    user: Pick<TUserData, "email" | "name"> | null,
    isAuthChecked: boolean,
    loading: boolean,
    error: string | null,
}

const initialState: TAuthStore = {
    user: null,
    isAuthChecked: false,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload;
        },

        setUser: (state, action) => {
        state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message ?? 'Произошла ошибка при регистрации';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message ?? 'Произошла ошибка при входе в аккаунт';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message ?? 'Произошла ошибка при выходе из аккаунта';
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
            })
    }
})

export const authReducer = authSlice.reducer;
export const { setAuthChecked, setUser } = authSlice.actions;

type TAuthActionCreators = typeof authSlice.actions;
export type TAuthActions = ReturnType<TAuthActionCreators[keyof TAuthActionCreators]>
