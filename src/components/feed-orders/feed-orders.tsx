import React from 'react';
import feedOrdersStyles from './feed-orders.module.css'

import OrderCard from './order-card/order-card';

const FeedOrders = (): React.JSX.Element => {
    const array = [...Array(9)]
    return (
        <section className={`${feedOrdersStyles.container} pr-2 custom-scroll`}>
            {array.map(() => (
                <OrderCard />
            ))}
        </section>
    );
};

export default FeedOrders;
