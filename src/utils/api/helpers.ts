import { refreshToken } from './auth-api';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

type TFetchOptions = {
    method: string,
    headers: HeadersInit,
    body?: string,
}

export const checkResponse = <T>(res: Response): Promise<T> => {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`);
};

export const fetchWithRefresh = async <T>(url: string, options: TFetchOptions): Promise<T> => {
    try {
        const fetchResponse = await fetch(url, options);
        return await checkResponse(fetchResponse);
    } catch (error) {
        if ((error as Error).message === "jwt expired") {
            const refreshResponse = await refreshToken(); //обновляем токен
            if (!refreshResponse.success) {
                return Promise.reject(refreshResponse);
            }
            localStorage.setItem('refreshToken', refreshResponse.refreshToken);
            localStorage.setItem('accessToken', refreshResponse.accessToken);

            const headers = new Headers(options.headers);

            headers.set("Authorization", refreshResponse.accessToken)

            options.headers = headers;

            const fetchResponse = await fetch(url, options); //повторяем запрос

            return checkResponse(fetchResponse);
        } else {
            return Promise.reject(error);
        }
    }
};
