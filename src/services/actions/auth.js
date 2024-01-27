import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser, getUserData } from '../../utils/api/auth-api';

export const setUser = createAsyncThunk(
    'auth/setUser',
    async (userData) => {
        const res = await registerUser(userData);
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        return res.user;
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (userData) => {
        const res = await loginUser(userData);
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        return res.user;
    }
);

export const getUser = createAsyncThunk(
    'auth/getUser',
    async () => {
        const res = await getUserData();
        return res.user;
    },
);
