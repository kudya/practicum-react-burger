import React, { useEffect } from 'react';
import ordersStyles from './orders.module.css';
import {useDispatch, useSelector} from '../../services/store';
import { connect, disconnect } from '../../services/actions/webSocket';

import OrderCard from '../feed-orders/order-card/order-card';

const FEED_ORDERS_PROFILE_URL = 'wss://norma.nomoreparties.space/orders';

const Orders = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const { data } = useSelector(store => store.feedOrdersProfile)

    const accessToken = localStorage.getItem('accessToken')?.split(' ') ?? ''

    const connectSocket = () => dispatch(connect(`${FEED_ORDERS_PROFILE_URL}?token=${accessToken[1]}`));
    const disconnectSocket = () => dispatch(disconnect());

    useEffect(() => {
        connectSocket();

        return () => {
            disconnectSocket();
        }
    }, [])

    return (
        <div className={`${ordersStyles.container} mt-10 pr-2`}>
            {data?.orders?.map((order, index) => (
                <OrderCard key={order._id} order={order}/>
            ))}
        </div>
    );
};

export default Orders;
