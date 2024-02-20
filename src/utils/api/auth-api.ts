import {BASE_URL, checkResponse, fetchWithRefresh} from './helpers';
import {TUserData, TAuthData} from "../types";

type TChangeUserData = Pick<TAuthData, 'success' | 'user'>
type TRefreshToken =  Pick<TAuthData, 'accessToken' | 'refreshToken' | 'success'>
type TLogout = Pick<TAuthData, 'success' | 'message'>
type TSendEmailToResetPassword = Pick<TAuthData, 'success' | 'message'>
type TResetPassword = Pick<TAuthData, 'success' | 'message'>
type TGetUserData = Pick<TAuthData, 'success' | 'user'>


// Регистрация пользователя
export const registerUserData = ({email, password, name}: Pick<TUserData, 'email' | 'password' | 'name'>): Promise<TAuthData> => {
    return fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({
            email,
            password,
            name,
        })
    }).then(checkResponse<TAuthData>)
}

// Вход зарегестрированного пользователя (Log In)
export const loginUser = ({email, password}: Pick<TUserData, 'email' | 'password'>): Promise<TAuthData> => {
    return fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({
            email,
            password,
        })
    }).then(checkResponse<TAuthData>)
}

// Получение данных о пользователе
export const getUserData = (): Promise<TGetUserData> => {
    return fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem('accessToken') ?? '',
        },
    })
}

// Изменение данных пользователя
export const changeUserData = ({name, email, password}: Pick<TUserData, 'email' | 'password' | 'name'>): Promise<TChangeUserData> => {
    return fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem('accessToken') ?? '',
        },
        body: JSON.stringify({name, email, password})
    })
};

// Обновление токена
export const refreshToken = (): Promise<TRefreshToken> => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        })
    }).then(checkResponse<TRefreshToken>);
}

export const logoutUser = (): Promise<TLogout> => {
    return fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        })
    }).then(checkResponse<TLogout>);
}

export const sendEmailToResetPassword = ({email}: Pick<TUserData, 'email'>): Promise<TSendEmailToResetPassword>  => {
    return fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email})
    }).then(checkResponse)
        .then((res) => {
            localStorage.setItem('isResetPassCodeSent', 'success');
            return {success: true};
        })
        .catch(() => ({success: false}));
}

export const resetPassword = ({password, code}: Pick<TUserData, 'password' | 'code'>): Promise<TResetPassword> => {
    return fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({password, token: code})
    }).then(checkResponse)
        .then(() => {
            localStorage.removeItem('isResetPassCodeSent');
            return {success: true};
        })
        .catch(() => ({success: false}));
}


