import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeOrderRequest } from '../../utils/burger-api';

export const  makeOrder = createAsyncThunk(
    "order/makeOrder",
    async (burgerIngredientsId,thunkAPI) => {
        try {
            return await makeOrderRequest(burgerIngredientsId);
        } catch (error) {
            thunkAPI.rejectWithValue(error.message)
        }
    });

