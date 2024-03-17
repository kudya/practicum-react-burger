import React, { useEffect } from 'react';
import feedPageStyles from './feed-page.module.css';
import { useDispatch } from '../../services/store';
import { connect, disconnect } from '../../services/actions/webSocket';

import FeedOrders from '../../components/feed-orders/feed-orders';
import FeedStats from '../../components/feed-stats/feed-stats';

const FEED_ORDERS_TOTAL_URL = 'wss://norma.nomoreparties.space/orders/all';

const FeedPage = (): React.JSX.Element => {
    const dispatch = useDispatch();

    const connectSocket = () => dispatch(connect(FEED_ORDERS_TOTAL_URL));
    const disconnectSocket = () => dispatch(disconnect());

    useEffect(() => {
        connectSocket();

        return () => {
            disconnectSocket();
        }
    }, [])

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
