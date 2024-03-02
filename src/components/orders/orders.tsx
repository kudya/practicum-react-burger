import React from 'react';
import ordersStyles from './orders.module.css'

import OrderCard from '../feed-orders/order-card/order-card';

const Orders = (): React.JSX.Element => {
    const array = [...Array(9)]

    return (
        <div className={`${ordersStyles.container} mt-10 pr-2`}>
            {array.map(() => (
                <OrderCard />
            ))}
        </div>
    );
};

export default Orders;
