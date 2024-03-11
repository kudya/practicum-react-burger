import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from '../../utils/api/burger-api';

export const loadIngredients = createAsyncThunk(
    'ingredients/loadIngredients',
    getIngredients
);

