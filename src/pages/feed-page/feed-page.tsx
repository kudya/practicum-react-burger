import React from 'react';
import feedPageStyles from './feed-page.module.css'

import FeedOrders from '../../components/feed-orders/feed-orders';
import FeedStats from '../../components/feed-stats/feed-stats';

const FeedPage = (): React.JSX.Element => {
    return (
        <div>
            <h2 className="text text_type_main-large mt-10 mb-5">Лента Заказов</h2>

            <div className={feedPageStyles.container}>
                <FeedOrders />
                <FeedStats />
            </div>

        </div>
    );
};

export default FeedPage;
