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

export type TConstructorIngredientData = TIngredientData & {key: string}

export type TAuthFormData = {
    name: string
    email: string,
    password: string,
    code: string,
}
