import { createSlice } from '@reduxjs/toolkit';
import { loadIngredients } from '../actions/ingredients';

const initialState = {
    ingredients: [],
    loading: false,
    error: null,
};

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
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
                state.error = action.payload;
            })
            .addCase(loadIngredients.fulfilled, (state, action) => {
                state.loading = false;
                state.ingredients = action.payload.data;
            })
    }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { clearIngredients } = ingredientsSlice.actions;
