import { createSlice } from '@reduxjs/toolkit';
import { setUser, login, getUser } from '../actions/auth';

const initialState = {
    user: null,
    isAuthChecked: false,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(setUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(setUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(setUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;

            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
    }
})

export const authReducer = authSlice.reducer;
