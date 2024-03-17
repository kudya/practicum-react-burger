export type TIngredientData = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
}

export type TOrder = {
    createdAt: string,
    ingredients: Array<TIngredientData>,
    name: string,
    number: number,
    owner: {
        createdAt: string,
        email: string,
        name: string,
        updateAt: string,
    },
    price: number,
    status: string,
    updatedAt: string,
    _id:string,
}

export type TOrderData = {
    name: string,
    order: TOrder
    success: boolean,
}

export type TConstructorIngredientData = TIngredientData & {key: string}

export type TUserData = {
    name: string
    email: string,
    password: string,
    code: string,
}

export type TAuthData = {
    accessToken: string,
    refreshToken: string,
    success: boolean,
    user: Pick<TUserData, 'email' |  'name'>,
    message?: string,
}

export type TFeedOrder = Pick<TOrder, '_id' | 'status' | 'name' | 'number' | 'createdAt' | 'updatedAt'> & {ingredients: Array<string>}

export type TFeedOrders = {
    success: boolean,
    orders: Array<TFeedOrder>,
    total?: number,
    totalToday?: number,
}

export enum ORDER_STATUS {
    Done = "Выполнен",
    Pending = "Готовится",
    Created = "Создан",
    Unknown = "Статус неизвестен",
}

