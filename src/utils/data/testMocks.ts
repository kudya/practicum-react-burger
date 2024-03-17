export const firstIngredientSample = {
    _id: "60666c42cc7b410027a1a9b1",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0
}

export const secondIngredientSample = {
    _id: "60666c42cc7b410027a1a9b5",
    name: "Говяжий метеорит (отбивная)",
    type: "main",
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: "https://code.s3.yandex.net/react/code/meat-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
    __v: 0
}

export const thirdIngredientSample = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
}

export const orderSample = {
    order: {
        ingredients: [{...firstIngredientSample}, {...secondIngredientSample}],
        _id: '65f6ced197ede0001d060f25',
        owner: {
            name: 'Mr. Test',
            email: 'mr.test@gmail.com',
            createdAt: '2024-01-27T16:42:15.701Z',
            updatedAt: '2024-02-22T08:25:22.353Z'
        },
        status: 'done',
        name: 'Флюоресцентный spicy бургер',
        createdAt: '2024-03-17T11:06:57.767Z',
        updatedAt: '2024-03-17T11:06:58.956Z',
        number: 36187,
        price: 2066
    }
}
