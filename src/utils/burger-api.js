const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';
const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

const getResponse = (res) => {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`);
};

export const getIngredients = () => {
    return fetch(INGREDIENTS_URL).then(getResponse);
};

export const makeOrderRequest = (burgerIngredientsIds) => {
    return fetch(ORDER_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({
            ingredients: burgerIngredientsIds,
        }),
    }).then(getResponse);
};



