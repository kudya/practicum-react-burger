import { createSlice } from '@reduxjs/toolkit';
import { TIngredientData } from '../../utils/types';


export type TIngredientInfoStore = {
    ingredient: TIngredientData | null,
}

const initialState: TIngredientInfoStore = {
    ingredient: null,
};

const ingredientInfoSlice = createSlice({
    name: 'ingredientInfo',
    initialState,
    reducers: {
        loadIngredientInfo: (state, action) => {
            state.ingredient = action.payload;
        },

        clearIngredientInfo: (state) => {
            state.ingredient = null;
        }
    },
})

export const ingredientInfoReducer = ingredientInfoSlice.reducer;
export const { loadIngredientInfo, clearIngredientInfo } = ingredientInfoSlice.actions;

type TIngredientInfoActionCreators = typeof ingredientInfoSlice.actions;
export type TIngredientInfoActions = ReturnType<TIngredientInfoActionCreators[keyof TIngredientInfoActionCreators]>;
