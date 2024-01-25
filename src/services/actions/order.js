import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeOrderRequest } from '../../utils/burger-api';

export const  makeOrder = createAsyncThunk(
    "order/makeOrder",
    async (burgerIngredientsIds) => await makeOrderRequest(burgerIngredientsIds));

