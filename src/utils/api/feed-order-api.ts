import { BASE_URL, checkResponse } from './helpers';
import {TFeedOrders} from '../types';

// Получение заказа по его номеру
export const getOrderByNumberRequest = (number: number): Promise<TFeedOrders> => {
    return fetch(`${BASE_URL}/orders/${number}`).then(checkResponse<TFeedOrders>);
};

