import {BASE_URL, checkResponse, fetchWithRefresh} from './helpers';

// Получение списка ингредиентов
export const getIngredients = () => {
    return fetch(`${BASE_URL}/ingredients`).then(checkResponse);
};

// Создание заказа
export const makeOrderRequest = (burgerIngredientsIds) => {
    return fetchWithRefresh(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem('accessToken'),
        },
        body: JSON.stringify({
            ingredients: burgerIngredientsIds,
        }),
    }).then(checkResponse);
};

