import { checkResponse,  BASE_URL} from './helpers';

const AUTH_URL = `${BASE_URL}/auth`;

// Регистрация пользователя
export const registerUser = ({email, password, name}) => {
    return fetch(`${AUTH_URL}/register`, {
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
    return fetch(`${AUTH_URL}/login`, {
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
    return fetch(`${AUTH_URL}/user`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem('accessToken'),
        },
    }).then(checkResponse)
}



