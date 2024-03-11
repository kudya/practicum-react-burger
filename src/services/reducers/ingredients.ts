import { createSlice } from '@reduxjs/toolkit';
import { loadIngredients } from '../actions/ingredients';
import {TIngredientData} from '../../utils/types';

export type TIngredientsStore = {
    ingredients: Array<TIngredientData>,
    loading: boolean,
    error: string | null,
}

const initialState: TIngredientsStore = {
    ingredients: [],
    loading: false,
    error: null,
};

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        // @ts-ignore
        clearIngredients: {
            reducer: (state) => {
                state.ingredients = [];
                state.loading = false;
                state.error = null;
            },
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadIngredients.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadIngredients.rejected, (state, action) => {
                state.loading = false;
                // @ts-ignore
                state.error = action.payload;
            })
            .addCase(loadIngredients.fulfilled, (state, action) => {
                state.loading = false;
                // @ts-ignore
                state.ingredients = action.payload.data;
            })
    }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { clearIngredients } = ingredientsSlice.actions;

type TIngredientsActionCreators = typeof ingredientsSlice.actions;
export type TIngredientsActions = ReturnType<TIngredientsActionCreators[keyof TIngredientsActionCreators]>
