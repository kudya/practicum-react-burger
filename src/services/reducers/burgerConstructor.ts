import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import { TIngredientData, TConstructorIngredientData } from '../../utils/types';

export type TBurgerConstructorStore = {
    bun: TConstructorIngredientData | null,
    ingredients: Array<TConstructorIngredientData>,
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
            reducer: (state, action: PayloadAction<TConstructorIngredientData>) => {
                state.bun = action.payload;
            },
            prepare: (bun: TIngredientData) => {
                return {payload: {...bun, key: nanoid()}}
            }
        },

        addIngredient: {
            reducer: (state, action: PayloadAction<TConstructorIngredientData>) => {
                state.ingredients.push(action.payload);
            },
            prepare: (ingredient: TIngredientData) => {
                return {payload: {...ingredient, key: nanoid()}}
            }
        },

        removeIngredient: (state, action) => {
            state.ingredients = state.ingredients.filter(ingredient => ingredient.key !== action.payload);
        },

        changeElementsOrder: (state, action) => {
            const {dragIndex, hoverIndex} = action.payload;
            state.ingredients.splice(dragIndex, 0, state.ingredients.splice(hoverIndex, 1)[0])
        },

        clearConstructor: (state) => {
            state.bun = null;
            state.ingredients = [];
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
