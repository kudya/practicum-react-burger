import { createSlice, nanoid } from '@reduxjs/toolkit';
import { TIngredientData } from '../../utils/types';

export type TBurgerConstructorStore = {
    bun: TIngredientData & {key?: string} | null,
    ingredients: Array<TIngredientData & {key?: string}>,
}
const initialState: TBurgerConstructorStore = {
    bun: null,
    ingredients: [],
};

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        setBun: {
            reducer: (state, action) => {
                state.bun = action.payload;
            },
            prepare: (bun) => {
                return { payload: {...bun, key: nanoid()}}
            }
        },
        addIngredient: {
            reducer: (state, action) => {
                state.ingredients.push(action.payload);
            },
            prepare: (ingredient) => {
                return { payload: {...ingredient, key: nanoid()}}
            }
        },
        //@ts-ignore
        removeIngredient: {
            reducer: (state, action) => {
                state.ingredients = state.ingredients.filter(ingredient => ingredient.key !== action.payload);
            },
        },
        //@ts-ignore
        changeElementsOrder: {
            reducer: (state, action) => {
                const { dragIndex, hoverIndex } = action.payload;
                state.ingredients.splice(dragIndex, 0, state.ingredients.splice(hoverIndex, 1)[0])
            },
        },
        //@ts-ignore
        clearConstructor: {
            reducer: (state) => {
                state.bun = null;
                state.ingredients = [];
            },
        },
    },
})

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const {
    setBun,
    addIngredient,
    removeIngredient,
    changeElementsOrder,
    clearConstructor
} = burgerConstructorSlice.actions;

type TBurgerConstructorActionCreators = typeof burgerConstructorSlice.actions;
export type TBurgerConstructorActions = ReturnType<TBurgerConstructorActionCreators[keyof TBurgerConstructorActionCreators]>;
