import React from 'react';
import feedStatsStyles from './feed-stats.module.css'
import {useSelector} from '../../services/store';

const FeedStats = (): React.JSX.Element => {
    const { data } = useSelector(store => store.feedOrders);

    const { total, totalToday, orders } = data ?? {};

    let ordersCompleted: Array<number> = [];
    let ordersInProgress: Array<number> = [];

    orders?.forEach(order => {
        order.status === 'done' ? ordersCompleted.push(order.number) : ordersInProgress.push(order.number);
    })

    return (
        <section className={feedStatsStyles.container}>
            <div className={feedStatsStyles.status}>
                <div>
                    <p className='text text_type_main-medium mb-6'>Готовы:</p>

                    <div className={feedStatsStyles['status-text']}>
                        {ordersCompleted.slice(0, 5).map((number) => (
                            <p className='text text_type_digits-default mb-2' key={number}>
                                { number }
                            </p>
                        ))}
                    </div>
                </div>

                <div>
                    <p className='text text_type_main-medium mb-6'>В работе:</p>

                    <div>
                        {ordersInProgress.slice(0, 5).map((number) => (
                            <p className='text text_type_digits-default mb-2' key={number}>
                                { number }
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <p className='text text_type_main-medium'>Выполнено за все время:</p>

                <p className='text text_type_digits-large'>
                    { total }
                </p>
            </div>

            <div>
                <p className='text text_type_main-medium'>Выполнено за сегодня:</p>

                <p className='text text_type_digits-large'>
                    { totalToday }
                </p>
            </div>

        </section>
    );
};

export default FeedStats;
