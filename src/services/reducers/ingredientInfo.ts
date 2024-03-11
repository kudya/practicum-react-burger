import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
        //@ts-ignore
        loadIngredientInfo: {
            reducer: (state, action: PayloadAction<TIngredientData>) => {
                state.ingredient = action.payload;
            },
        },
        //@ts-ignore
        clearIngredientInfo: {
            reducer: (state) => {
                state.ingredient = null;
            }
        }
    },
})

export const ingredientInfoReducer = ingredientInfoSlice.reducer;
export const { loadIngredientInfo, clearIngredientInfo } = ingredientInfoSlice.actions;

type TIngredientInfoActionCreators = typeof ingredientInfoSlice.actions;
export type TIngredientInfoActions = ReturnType<TIngredientInfoActionCreators[keyof TIngredientInfoActionCreators]>;
