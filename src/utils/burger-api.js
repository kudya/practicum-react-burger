const BASE_URL = 'https://norma.nomoreparties.space/api';

const getResponse = (res) => {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`);
};

export const getIngredients = () => {
    return fetch(`${BASE_URL}/ingredients`).then(getResponse);
};

export const makeOrderRequest = (burgerIngredientsIds) => {
    return fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({
            ingredients: burgerIngredientsIds,
        }),
    }).then(getResponse);
};



