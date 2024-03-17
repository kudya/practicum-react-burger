import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeOrderRequest } from '../../utils/api/burger-api';
import { getOrderByNumberRequest } from '../../utils/api/feed-order-api';

export const  makeOrder = createAsyncThunk(
    "order/makeOrder",
    async (burgerIngredientsIds: Array<string>) => await makeOrderRequest(burgerIngredientsIds)
);

export const  getOrderByNumber = createAsyncThunk(
    "order/getOrderByNumber",
    async (number: number) => await getOrderByNumberRequest(number)
);
