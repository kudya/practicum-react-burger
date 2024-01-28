import {BASE_URL, checkResponse, fetchWithRefresh} from './helpers';

// Регистрация пользователя
export const registerUserData = ({email, password, name}) => {
    return fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({
            email,
            password,
            name,
        })
    }).then(checkResponse)
}

// Вход зарегестрированного пользователя (Log In)
export const loginUser = ({email, password}) => {
    return fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({
            email,
            password,
        })
    }).then(checkResponse)
}

// Получение данных о пользователе
export const getUserData = () => {
    return fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem('accessToken'),
        },
    }).then(checkResponse)
}

// Изменение данных пользователя
export const changeUserData = ({name, email, password}) => {
    return fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem('accessToken'),
        },
        body: JSON.stringify({name, email, password})
    }).then(checkResponse)
}

// Обновление токена
export const refreshToken = () => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        })
    }).then(checkResponse);
}

export const logoutUser = () => {
    return fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        })
    }).then(checkResponse);
}


