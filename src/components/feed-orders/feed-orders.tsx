import React from 'react';
import feedOrdersStyles from './feed-orders.module.css'

import OrderCard from './order-card/order-card';
import {useSelector} from "../../services/store";

const FeedOrders = (): React.JSX.Element => {
    const { data } = useSelector(store => store.feedOrders);

    return (
        <section className={`${feedOrdersStyles.container} pr-2 custom-scroll`}>
            {data?.orders.map((order) => (
                <OrderCard
                    key={order._id} order={order}/>
            ))}
        </section>
    );
};

export default FeedOrders;
