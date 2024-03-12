import {BASE_URL, checkResponse, fetchWithRefresh} from './helpers';
import {TIngredientData, TOrderData} from '../types';

type TGetIngredients = {
    success: boolean,
    data: Array<TIngredientData>,
}

// Получение списка ингредиентов
export const getIngredients = (): Promise<TGetIngredients> => {
    return fetch(`${BASE_URL}/ingredients`).then(checkResponse<TGetIngredients>);
};

// Создание заказа
export const makeOrderRequest = (burgerIngredientsIds: Array<string>): Promise<TOrderData> => {
    return fetchWithRefresh(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
             Authorization: localStorage.getItem('accessToken') ?? '',
        },
        body: JSON.stringify({
            ingredients: burgerIngredientsIds,
        }),
    })
};

