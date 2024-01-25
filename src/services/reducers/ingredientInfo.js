import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ingredient: null,
};

const ingredientInfoSlice = createSlice({
    name: 'ingredientInfo',
    initialState,
    reducers: {
        loadIngredientInfo: {
            reducer: (state, action) => {
                state.ingredient = action.payload;
            },
        },
        clearIngredientInfo: {
            reducer: (state) => {
                state.ingredient = null;
            }
        }
    },
})

export const ingredientInfoReducer = ingredientInfoSlice.reducer;
export const { loadIngredientInfo, clearIngredientInfo } = ingredientInfoSlice.actions;
