import { checkResponse,  BASE_URL} from './helpers';

// Получение списка ингредиентов
export const getIngredients = () => {
    return fetch(`${BASE_URL}/ingredients`).then(checkResponse);
};

// Создание заказа
export const makeOrderRequest = (burgerIngredientsIds) => {
    return fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({
            ingredients: burgerIngredientsIds,
        }),
    }).then(checkResponse);
};

