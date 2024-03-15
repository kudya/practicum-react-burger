import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserData, loginUser, getUserData, changeUserData, logoutUser } from '../../utils/api/auth-api';
import { setUser, setAuthChecked } from '../reducers/auth';

import { TUserData } from "../../utils/types";
import { AppDispatch } from '../store';

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: Pick<TUserData, 'email' | 'password' | 'name'>) => {
        const res = await registerUserData(userData);
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        return res.user;
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (userData: Pick<TUserData, 'email' | 'password'>) => {
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
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return res;
    }
);

export const getUser = () => {
    return (dispatch: AppDispatch) => {
        return getUserData()
            .then(res => dispatch(setUser(res.user)))
            .catch(() => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                dispatch(setUser(null))
            })
            .finally(() => dispatch(setAuthChecked(true)))
    }
}

export const changeUser = (userData: Pick<TUserData, 'email' | 'password' | 'name'>) => {
    return (dispatch: AppDispatch) => {
        return changeUserData(userData)
            .then(res => dispatch(setUser(res.user)))
    }
}

export const checkUserAuth = () => {
    return (dispatch: AppDispatch) => {
        if (localStorage.getItem('accessToken')) {
            dispatch(getUser());
        } else {
            dispatch(setAuthChecked(true));
        }
    };
}
