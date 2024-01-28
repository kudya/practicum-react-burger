import { refreshToken } from './auth-api';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }

    if (res.success) {
        return res;
    }

    return Promise.reject(`Ошибка ${res.status}`);
};

export const fetchWithRefresh = async (url, options) => {
    try {
        const fetchResponse = await fetch(url, options);
        return await checkResponse(fetchResponse);
    } catch (error) {
        if (error.message === "jwt expired") {
            const refreshResponse = await refreshToken(); //обновляем токен
            if (!refreshResponse.success) {
                return Promise.reject(refreshResponse);
            }
            localStorage.setItem('refreshToken', refreshResponse.refreshToken);
            localStorage.setItem('accessToken', refreshResponse.accessToken);

            options.headers.authorization = refreshResponse.accessToken;

            const fetchResponse = await fetch(url, options); //повторяем запрос

            return checkResponse(fetchResponse);
        } else {
            return Promise.reject(error);
        }
    }
};
