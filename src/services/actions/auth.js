import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserData, loginUser, getUserData, changeUserData, logoutUser } from '../../utils/api/auth-api';
import { setUser, setAuthChecked } from '../reducers/auth';

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData) => {
        const res = await registerUserData(userData);
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

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        const res = await logoutUser();
        localStorage.removeItem('accessToken', res.accessToken);
        localStorage.removeItem('refreshToken', res.refreshToken);
        return res.user;
    }
);

export const getUser = () => {
    return (dispatch) => {
        return getUserData()
            .then(res => dispatch(setUser(res.user)))
    }
}

export const changeUser = (userData) => {
    return (dispatch) => {
        return changeUserData(userData)
            .then(res => dispatch(setUser(res.user)))
    }
}

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem('accessToken')) {
            dispatch(getUser())
                .catch(() => {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    dispatch(setUser(null))
                })
                .finally(() => dispatch(setAuthChecked(true)))
        } else {
            dispatch(setAuthChecked(true));
        }
    };
}
