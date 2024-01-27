import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeOrderRequest } from '../../utils/api/burger-api';

export const  makeOrder = createAsyncThunk(
    "order/makeOrder",
    makeOrderRequest
);

