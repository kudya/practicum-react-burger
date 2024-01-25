import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
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
        removeIngredient: {
            reducer: (state, action) => {
                state.ingredients = state.ingredients.filter(ingredient => ingredient.key !== action.payload);
            },
        },
        changeElementsOrder: {
            reducer: (state, action) => {
                const { dragIndex, hoverIndex } = action.payload;
                state.ingredients.splice(dragIndex, 0, state.ingredients.splice(hoverIndex, 1)[0])
            },
        },
        clearConstructor: {
            reducer: (state) => {
                state.bun = null;
                state.ingredients = [];
            },
        },
    },
})

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const { setBun,  addIngredient, removeIngredient, changeElementsOrder, clearConstructor } = burgerConstructorSlice.actions;
